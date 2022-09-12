
const runTimeDependencies = {
    "load": {
        "@youwol/flux-view": "^1.0.0",
        "@youwol/http-clients": "^1.0.0",
        "@youwol/cdn-client": "^1.0.0",
        "@youwol/fv-input": "^0.2.0",
        "@youwol/fv-button": "^0.1.0",
        "@youwol/fv-tabs": "^0.2.0",
        "@youwol/os-core": "^0.1.0",
        "rxjs": "^6.5.5"
    },
    "differed": {},
    "includedInBundle": []
}
const externals = {
    "@youwol/flux-view": "@youwol/flux-view_APIv1",
    "@youwol/http-clients": "@youwol/http-clients_APIv1",
    "@youwol/cdn-client": "@youwol/cdn-client_APIv1",
    "@youwol/fv-input": "@youwol/fv-input_APIv02",
    "@youwol/fv-button": "@youwol/fv-button_APIv01",
    "@youwol/fv-tabs": "@youwol/fv-tabs_APIv02",
    "@youwol/os-core": "@youwol/os-core_APIv01",
    "rxjs": "rxjs_APIv6",
    "rxjs/operators": {
        "commonjs": "rxjs/operators",
        "commonjs2": "rxjs/operators",
        "root": [
            "rxjs_APIv6",
            "operators"
        ]
    }
}
export const setup = {
    name:'@youwol/os-asset',
    assetId:'QHlvdXdvbC9vcy1hc3NldA==',
    version:'0.1.0',
    shortDescription:"Collection of views related to asset of YouWol's Operating System.",
    developerDocumentation:'https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=@youwol/os-asset',
    npmPackage:'https://www.npmjs.com/package/@youwol/os-asset',
    sourceGithub:'https://github.com/youwol/os-asset',
    userGuide:'https://l.youwol.com/doc/@youwol/os-asset',
    apiVersion:'01',
    runTimeDependencies,
    externals
}
