import { child$, childrenAppendOnly$, VirtualDOM } from '@youwol/flux-view'
import { Observable, ReplaySubject } from 'rxjs'

import { AssetsBackend } from '@youwol/http-clients'
import { AssetPresenterTrait, AssetSnippetView } from './asset-snippet.view'

/**
 * # AssetsListView
 */
export class AssetsListView implements VirtualDOM {
    static ClassSelector = 'assets-list-view'
    public readonly class = `${AssetsListView.ClassSelector} h-100 overflow-auto w-100`
    public readonly style = { minHeight: '0px' }
    public readonly children: VirtualDOM

    public readonly assets$: Observable<AssetsBackend.GetAssetResponse[]>
    public readonly state: AssetPresenterTrait

    constructor(parameters: {
        assets$: Observable<AssetsBackend.GetAssetResponse[]>
        state: AssetPresenterTrait
    }) {
        Object.assign(this, parameters)

        const elementInDoc$ = new ReplaySubject(1)
        this.children = [
            {
                class: 'w-100 d-flex flex-wrap justify-content-around ',
                children: childrenAppendOnly$(
                    this.assets$,
                    (asset: AssetsBackend.GetAssetResponse) =>
                        new AssetSnippetView({ asset, state: this.state }),
                    { sideEffects: () => elementInDoc$.next(true) },
                ),
            },
            child$(elementInDoc$, () => ({}), {
                untilFirst: {
                    class: 'd-flex flex-column justify-content-center h-100',
                    children: [{ class: 'fas fa-spinner fa-spin' }],
                },
            }),
        ]
    }
}
