import shutil
from pathlib import Path

from youwol.pipelines.pipeline_typescript_weback_npm import Template, PackageType, Dependencies, \
    RunTimeDeps, generate_template, Bundles, MainModule
from youwol.utils import parse_json

folder_path = Path(__file__).parent

pkg_json = parse_json(folder_path / 'package.json')

load_dependencies = {
    "@youwol/flux-view": "^1.0.3",
    "@youwol/http-clients": "^2.0.5",
    "@youwol/http-primitives": "^0.1.2",
    "@youwol/cdn-client": "^2.1.0",
    "@youwol/fv-input": "^0.2.1",
    "@youwol/fv-button": "^0.1.1",
    "@youwol/fv-tabs": "^0.2.1",
    "@youwol/os-core": "^0.1.13",
    "rxjs": "^6.5.5",
    # ideally marked should be imported in due time (when DescriptionView is required)
    "marked": "^4.2.3"
}

template = Template(
    path=folder_path,
    type=PackageType.LIBRARY,
    name=pkg_json['name'],
    version=pkg_json['version'],
    shortDescription=pkg_json['description'],
    author=pkg_json['author'],
    dependencies=Dependencies(
        runTime=RunTimeDeps(
            externals=load_dependencies
        ),
        devTime={}
    ),
    bundles=Bundles(
        mainModule=MainModule(
            entryFile="./index.ts",
            loadDependencies=list(load_dependencies.keys())
        )
    ),
    userGuide=True
)

generate_template(template)

shutil.copyfile(
    src=folder_path / '.template' / 'src' / 'auto-generated.ts',
    dst=folder_path / 'src' / 'auto-generated.ts'
)
for file in ['README.md', '.gitignore', '.npmignore', '.prettierignore', 'LICENSE', 'package.json',
             'tsconfig.json', 'webpack.config.ts']:
    shutil.copyfile(
        src=folder_path / '.template' / file,
        dst=folder_path / file
    )




