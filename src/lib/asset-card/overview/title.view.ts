import { attr$, VirtualDOM } from '@youwol/flux-view'
import { BehaviorSubject } from 'rxjs'
import { AssetsBackend } from '@youwol/http-clients'

export class AssetTitleView implements VirtualDOM {
    static ClassSelector = 'asset-title-view'

    public readonly class = `${AssetTitleView.ClassSelector} w-100`
    public readonly asset: AssetsBackend.GetAssetResponse
    public readonly permissions: AssetsBackend.GetPermissionsResponse
    public readonly children: VirtualDOM[]
    public readonly name$: BehaviorSubject<string>
    public readonly forceReadonly: boolean

    constructor(params: {
        name$: BehaviorSubject<string>
        asset: AssetsBackend.GetAssetResponse
        permissions: AssetsBackend.GetPermissionsResponse
    }) {
        Object.assign(this, params)

        this.children = [this.readOnlyView(this.name$)]
    }

    readOnlyView(name$: BehaviorSubject<string>) {
        return {
            tag: 'h1',
            class: 'text-center',
            style: {
                fontWeight: 'bolder',
            },
            innerText: attr$(name$, (name) => name),
            children: [
                this.permissions.write ? {} : { class: 'fas fa-lock ml-3' },
            ],
        }
    }
}
