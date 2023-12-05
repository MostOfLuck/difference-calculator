Compares two configuration files and shows a difference
---------------------------------------------------------



### Hexlet tests and linter status:
[![Actions Status](https://github.com/MostOfLuck/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/MostOfLuck/frontend-project-46/actions)
[![Build Status](https://github.com/MostOfLuck/frontend-project-46/actions/workflows/node.js.yml/badge.svg
)](https://github.com/MostOfLuck/frontend-project-46/actions/workflows/node.js.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/425d8c76e1328c1a3bcf/maintainability)](https://codeclimate.com/github/MostOfLuck/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a8d6ee366154c48f5fab/test_coverage)](https://codeclimate.com/github/MostOfLuck/frontend-project-46/test_coverage)


   
Install
-------------------

1. Clone repository local
`git clone git@github.com:MostOfLuck/frontend-project-46.git`
2. Install all dependencies 
`npm install`
3. Install  apps global
`npm link`
4. Run app with command:
`gendiff <filepath1>filename1.json <filepath2>filename2.yaml`

    where `<filepath>` - absolute or relative file path

   
Description
-------------------

Gendiff is a utility designed to identify discrepancies between two data structures. The tool seamlessly handles both JSON and YAML/YML files. The default output format for the differences is 'stylish.' If you desire an alternative output format, simply use the `-f` or `--format` flag with one of the following options:

`stylish` (default) - Provides a clear and visually appealing difference output.

`plain` - Presents the differences in a line-by-line format for easy comparison.

`json` - Outputs the differences in a JSON format, suitable for machine-readable information.


Compare json
--------------------------  
 You can compare json files like this:
 ```bash
$  gendiff file1.json file2.json
```

 Demonstration: <a href="https://asciinema.org/a/611315" target="_blank"><img src="https://asciinema.org/a/602271.svg" /></a>

Compare yml
--------------------------  
 You can compare yml files like this:
 ```bash
$  gendiff file1.yml file2.yml
```

 Demonstration: <a href="https://asciinema.org/a/611590" target="_blank"><img src="https://asciinema.org/a/602271.svg" /></a>


Recursive comparison
--------------------------  
 You can compare yml and json files like this:
 ```bash
$  gendiff file1.json file2.yml
```

 Demonstration: <a href="https://asciinema.org/a/611644" target="_blank"><img src="https://asciinema.org/a/602271.svg" /></a>


Comparison with format plain
-----------------------------
 You can compare files in plain format like this:
 ```bash
$  gendiff file1.yml file2.yml -f plain
```

Demonstration: <a href="https://asciinema.org/a/625189" target="_blank"><img src="https://asciinema.org/a/602271.svg" /></a>

## Developers

[MostOfLuck](https://github.com/MostOfLuck) 💪
