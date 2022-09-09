from pathlib import Path

from youwol.pipelines.pipeline_typescript_weback_npm import Template, PackageType, Dependencies, \
    RunTimeDeps, generate_template

template = Template(
    path=Path(__file__).parent,
    type=PackageType.Library,
    name="@youwol/os-asset",
    version="0.0.2-wip",
    shortDescription="Collection of views related to asset of YouWol's Operating System.",
    author="greinisch@youwol.com",
    dependencies=Dependencies(
        runTime=RunTimeDeps(
            load={
                "@youwol/http-clients": "^0.1.12",
                "@youwol/flux-view": "^0.1.1",
                #  fv-button not yet published => use 0.0.5 in dependencies
                "@youwol/os-core": "^0.0.6",
                #  fv-button not yet published => use 0.0.4 in dependencies
                "@youwol/fv-button": "^0.0.5",
                "rxjs": "^6.5.5",
                "@youwol/cdn-client": "^0.1.4",
                "@youwol/fv-tabs": "^0.1.2",
                "@youwol/fv-input": "^0.1.0",
            }
        ),
        devTime={
            "uuid": "^8.3.2"
        }
    ),
    userGuide=True
    )

generate_template(template)
