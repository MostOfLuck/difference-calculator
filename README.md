Compares two configuration files and shows a difference
---------------------------------------------------------



### Hexlet tests and linter status:
[![Actions Status](https://github.com/MostOfLuck/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/MostOfLuck/frontend-project-46/actions)
[![Build Status](https://github.com/MostOfLuck/frontend-project-46/actions/workflows/node.js.yml/badge.svg
)](https://github.com/MostOfLuck/frontend-project-46/actions/workflows/node.js.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/425d8c76e1328c1a3bcf/maintainability)](https://codeclimate.com/github/MostOfLuck/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a8d6ee366154c48f5fab/test_coverage)](https://codeclimate.com/github/MostOfLuck/frontend-project-46/test_coverage)


   
### Install ###

1. Clone repository local
`git clone git@github.com:MostOfLuck/frontend-project-46.git`
2. Install all dependencies 
`npm install`
3. Install  apps global
`npm link`
4. Run app with command:
`gendiff <filepath1>filename1.json <filepath2>filename2.yaml`

    where `<filepath>` - absolute or relative file path

   
### Description ### 

Gendiff - is a utility that determines the difference between two data structures. Utility can work with json and yaml/yml files. By default using 'stylish' output format of difference. For another output format, use the flag `-f` or `--format` with next values:

`stylish` - using by default

`plain` - for line-by-line output of the difference

`json`  - for json output of the difference


Parcing json
--------------------------  
 You can parcel json files like this:
 ```bash
$  gendiff file1.json file2.json
```

 Demonstration: <a href="https://asciinema.org/a/611315" target="_blank"><img src="https://asciinema.org/a/602271.svg" /></a>

Parcing yml
--------------------------  
 You can parcel yml files like this:
 ```bash
$  gendiff file1.yml file2.yml
```

 Demonstration: <a href="https://asciinema.org/a/611590" target="_blank"><img src="https://asciinema.org/a/602271.svg" /></a>


Recursive comparison
--------------------------  
 You can parcel yml and json files like this:
 ```bash
$  gendiff file1.json file2.yml
```

 Demonstration: <a href="https://asciinema.org/a/611644" target="_blank"><img src="https://asciinema.org/a/602271.svg" /></a>
