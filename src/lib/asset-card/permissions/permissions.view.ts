import { child$, VirtualDOM } from '@youwol/flux-view'
import { Observable } from 'rxjs'
import { share } from 'rxjs/operators'

import { AssetsBackend, AssetsGateway } from '@youwol/http-clients'
import { raiseHTTPErrors } from '@youwol/http-primitives'
import { ExposedGroupState, ExposedGroupView } from './group-permissions.view'

type AccessInfo = AssetsBackend.QueryAccessInfoResponse
type Asset = AssetsBackend.GetAssetResponse

export class AssetPermissionsView implements VirtualDOM {
    static ClassSelector = 'asset-permissions-view'
    public readonly class = `${AssetPermissionsView.ClassSelector} w-100 h-100 overflow-auto d-flex justify-content-center`
    public readonly children: VirtualDOM[]

    public readonly accessInfo$: Observable<AccessInfo>
    public readonly asset: Asset
    public readonly permissions: AssetsBackend.GetPermissionsResponse
    static readonly titleClass = 'w-100 text-center'
    static readonly titleStyle = {
        'font-family': 'fantasy',
        'font-size': 'large',
    }

    constructor(params: {
        asset: Asset
        permissions: AssetsBackend.GetPermissionsResponse
    }) {
        Object.assign(this, params)
        this.accessInfo$ = new AssetsGateway.Client().assets
            .queryAccessInfo$({ assetId: this.asset.assetId })
            .pipe(raiseHTTPErrors(), share())
        this.children = [
            child$(this.accessInfo$, (accessInfo) => {
                return {
                    class: 'w-50 mx-auto my-auto rounded border',
                    style: {
                        position: 'relative',
                    },
                    children: [
                        {
                            class: 'fv-bg-background fv-xx-lighter h-100 w-100',
                            style: {
                                opacity: '0.5',
                                position: 'absolute',
                                zIndex: '-1',
                            },
                        },
                        {
                            class: 'p-2',
                            children: [
                                new UserPermissionsView({ accessInfo }),
                                new GroupsPermissionsView({
                                    accessInfo,
                                    asset: this.asset,
                                    permissions: this.permissions,
                                }),
                            ],
                        },
                    ],
                }
            }),
        ]
    }
}

export class UserPermissionsView implements VirtualDOM {
    static ClassSelector = 'user-permissions-view'
    public readonly class = `${UserPermissionsView.ClassSelector} mx-auto my-5`
    public readonly children: VirtualDOM[]

    public readonly accessInfo: AccessInfo

    constructor(params: { accessInfo: AccessInfo }) {
        Object.assign(this, params)

        const permissions = this.accessInfo.consumerInfo.permissions

        this.children = [
            {
                class: AssetPermissionsView.titleClass,
                style: AssetPermissionsView.titleStyle,
                innerText: 'Your permissions',
            },
            {
                class: 'd-flex align-items-center justify-content-around',
                style: {
                    fontWeight: 'bolder',
                },
                children: [
                    {
                        class:
                            'd-flex align-items-center ' +
                            (permissions.read
                                ? 'fv-text-success'
                                : 'fv-text-disabled'),
                        children: [
                            {
                                class: permissions.read
                                    ? 'fas fa-check'
                                    : 'fas fa-times',
                            },
                            { class: 'px-2', innerText: 'read' },
                        ],
                    },
                    {
                        class:
                            'd-flex align-items-center ' +
                            (permissions.write
                                ? 'fv-text-success'
                                : 'fv-text-disabled'),
                        children: [
                            {
                                class: permissions.write
                                    ? 'fas fa-check'
                                    : 'fas fa-times',
                            },
                            { class: 'px-2', innerText: 'write' },
                        ],
                    },
                    permissions.expiration
                        ? { innerText: permissions.expiration }
                        : undefined,
                ],
            },
        ]
    }
}

export class GroupsPermissionsView implements VirtualDOM {
    static ClassSelector = 'groups-permissions-view'
    public readonly class = `${GroupsPermissionsView.ClassSelector} mx-auto my-5`
    public readonly children: VirtualDOM[] = []

    public readonly asset: Asset
    public readonly permissions: AssetsBackend.GetPermissionsResponse
    public readonly accessInfo: AccessInfo

    constructor(params: {
        accessInfo: AccessInfo
        asset: Asset
        permissions: AssetsBackend.GetPermissionsResponse
    }) {
        Object.assign(this, params)

        if (!this.accessInfo.ownerInfo) {
            return
        }

        const exposedGroups = this.accessInfo.ownerInfo.exposingGroups
            .filter((group) => group.name != 'private')
            .map((group) => {
                return new ExposedGroupView(
                    new ExposedGroupState({
                        asset: this.asset,
                        permissions: this.permissions,
                        data: group,
                    }),
                )
            })
        const expState = new ExposedGroupState({
            asset: this.asset,
            permissions: this.permissions,
            data: {
                groupId: '*',
                name: '*',
                access: this.accessInfo.ownerInfo.defaultAccess,
            },
        })
        const expView = new ExposedGroupView(expState)

        this.children = [
            {
                class: '',
                children: [
                    {
                        class: AssetPermissionsView.titleClass,
                        style: AssetPermissionsView.titleStyle,
                        innerText: 'Default access',
                    },
                    {
                        class: '',
                        children: [expView],
                    },
                ],
            },
            {
                class: 'my-5',
                children: [
                    {
                        class: AssetPermissionsView.titleClass,
                        style: AssetPermissionsView.titleStyle,
                        innerText: 'Exposing groups',
                    },
                    exposedGroups.length > 0
                        ? {
                              class: '',
                              children: exposedGroups,
                          }
                        : {
                              class: 'text-center',
                              style: {
                                  fontStyle: 'italic',
                              },
                              innerText:
                                  'The asset is not exposed in other groups.',
                          },
                ],
            },
        ]
    }
}
