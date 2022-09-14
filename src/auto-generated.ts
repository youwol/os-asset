
const runTimeDependencies = {
    "load": {
        "@youwol/flux-view": "^1.0.3",
        "@youwol/http-clients": "^1.0.2",
        "@youwol/cdn-client": "^1.0.2",
        "@youwol/fv-input": "^0.2.1",
        "@youwol/fv-button": "^0.1.1",
        "@youwol/fv-tabs": "^0.2.1",
        "@youwol/os-core": "^0.1.1",
        "rxjs": "^6.5.5"
    },
    "differed": {},
    "includedInBundle": []
}
const externals = {
    "@youwol/flux-view": {
        "commonjs": "@youwol/flux-view",
        "commonjs2": "@youwol/flux-view",
        "root": "@youwol/flux-view_APIv1"
    },
    "@youwol/http-clients": {
        "commonjs": "@youwol/http-clients",
        "commonjs2": "@youwol/http-clients",
        "root": "@youwol/http-clients_APIv1"
    },
    "@youwol/cdn-client": {
        "commonjs": "@youwol/cdn-client",
        "commonjs2": "@youwol/cdn-client",
        "root": "@youwol/cdn-client_APIv1"
    },
    "@youwol/fv-input": {
        "commonjs": "@youwol/fv-input",
        "commonjs2": "@youwol/fv-input",
        "root": "@youwol/fv-input_APIv02"
    },
    "@youwol/fv-button": {
        "commonjs": "@youwol/fv-button",
        "commonjs2": "@youwol/fv-button",
        "root": "@youwol/fv-button_APIv01"
    },
    "@youwol/fv-tabs": {
        "commonjs": "@youwol/fv-tabs",
        "commonjs2": "@youwol/fv-tabs",
        "root": "@youwol/fv-tabs_APIv02"
    },
    "@youwol/os-core": {
        "commonjs": "@youwol/os-core",
        "commonjs2": "@youwol/os-core",
        "root": "@youwol/os-core_APIv01"
    },
    "rxjs": {
        "commonjs": "rxjs",
        "commonjs2": "rxjs",
        "root": "rxjs_APIv6"
    },
    "rxjs/operators": {
        "commonjs": "rxjs/operators",
        "commonjs2": "rxjs/operators",
        "root": [
            "rxjs_APIv6",
            "operators"
        ]
    }
}
const exportedSymbols = {
    "@youwol/flux-view": {
        "apiKey": "1",
        "exportedSymbol": "@youwol/flux-view"
    },
    "@youwol/http-clients": {
        "apiKey": "1",
        "exportedSymbol": "@youwol/http-clients"
    },
    "@youwol/cdn-client": {
        "apiKey": "1",
        "exportedSymbol": "@youwol/cdn-client"
    },
    "@youwol/fv-input": {
        "apiKey": "02",
        "exportedSymbol": "@youwol/fv-input"
    },
    "@youwol/fv-button": {
        "apiKey": "01",
        "exportedSymbol": "@youwol/fv-button"
    },
    "@youwol/fv-tabs": {
        "apiKey": "02",
        "exportedSymbol": "@youwol/fv-tabs"
    },
    "@youwol/os-core": {
        "apiKey": "01",
        "exportedSymbol": "@youwol/os-core"
    },
    "rxjs": {
        "apiKey": "6",
        "exportedSymbol": "rxjs"
    }
}
export const setup = {
    name:'@youwol/os-asset',
        assetId:'QHlvdXdvbC9vcy1hc3NldA==',
    version:'0.1.1',
    shortDescription:"Collection of views related to asset of YouWol's Operating System.",
    developerDocumentation:'https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=@youwol/os-asset',
    npmPackage:'https://www.npmjs.com/package/@youwol/os-asset',
    sourceGithub:'https://github.com/youwol/os-asset',
    userGuide:'https://l.youwol.com/doc/@youwol/os-asset',
    apiVersion:'01',
    runTimeDependencies,
    externals,
    exportedSymbols,
    getDependencySymbolExported: (module:string) => {
        return `${exportedSymbols[module].exportedSymbol}_APIv${exportedSymbols[module].apiKey}`
    }
}
