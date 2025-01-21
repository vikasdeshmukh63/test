A. install husky iwth lint-staged
        1. npm i husky lint-staged -D
        2. npx husky init
        3. we will get pre-commit file where we will write what we need to do precommit it has a text npm test
        4. now if we will commit anything on git then first the npm test will run

B. setup Typescript
        1. npm i typescript -D
        2. we have to add typescript config with npx tsc --init
        3. make following setup in tsconfig.json
                target:es2016
                module:commonjs
                rootDir:"./src",
                outDir:"./dist" or "./build"
                removeComments:true
                esModuleInterop:true
                forConsistantcasingiffileNames:true
                strict:true
                noImplicitAny:true
                stictFunctionTypes:true
                strictPropertyInitialization:true
                alwaysStrict:true
                noUnusedLocals:true
                noUnusedParameters:true
                noImplecitReturns:true
        4. npm i -D @types/node
        5. npm i ts-node -D (ts-node is a TypeScript execution engine for Node.js. It allows you to run TypeScript code directly without having to compile it to JavaScript first.)

C. setup nodemon and change scripts
        npm i nodemon -D

D. setup build script
        dist":"npx tsc" (it will compile ts and create a js files)

E. folder structure

        (IN SRC folder)
        --config >
                  config.ts
        --constants >
                     application.ts
                     responseMessage.ts 
        --controller >
                      apiController.ts
        --model > 
                 model.ts
        --router >
                  router.ts
        --services >
        --types > 
                 types.ts
        --utils >
                 quicker.ts(for most used utils)
                 errorObject.ts
                 httpError.ts
                 httpResponse.ts
        --middleware >
                      globalErrorHandler.ts
        --view >

        (OUTSIDE SRC FOLDER AT ROOT LEVEL)
        --script > 
        --nginx >
                 http.conf
                 https.conf 
        --logs >
        --public >
        --test >
        --docker >
                  Dockerfile
        .env.development
        .env.production
        .env.example
        README.md
        nodemon.json (for development)
        ecosystem.config.js (for deployemt in production)

F. Commit lint (used for validation for commit msg)
        1. npm i @commitlint/cli @commitlint/config-conventional -D

        2. create commit-msg file of shell scripting in .husky/commit-msg and add following rule init
                ```#!/user/bin/env sh
                . "$(dirname -- "$0")/_/husky.sh"
                npx --no-install commitlint --edit "$1"```

        3. create a commitlint.config.js file in root dir and add following rules
                ```module.exports = {
                                        extends: ["@commitlint/cli", "@commitlint/config-conventional"],
                                         rules: {
                                                "type-enum": [2, "always", ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"]],
                                                "subject-case": [2, "always", "sentence-case"],
                                                },
                                    };```

G. eslint setup
        1.npm install --save-dev eslint @eslint/js typescript typescript-eslint
        2. create in root eslint.config.js (create eslint.config.mjs to use commonjs modules)
        3. put the following in the eslint.config.js
                ```// @ts-check

                        import eslint from '@eslint/js';
                        import tseslint from 'typescript-eslint';

                        export default tseslint.config(
                        eslint.configs.recommended,
                        tseslint.configs.recommended,
                        );```
        4. to make eslint work in commonjs module we have to enter following
                ```// @ts-check

                        import eslint from '@eslint/js';
                        import tseslint from 'typescript-eslint';

                        export default tseslint.config({
                                languageOptions:{
                                        parserOptions:{
                                                project:true,
                                                tsconfigRootDir:import.meta.dirname
                                        }
                                },
                                files:["**/*.ts"],
                                extends:[
                                        eslint.configs.recommended,
                                        ...tseslint.configs.recommendedTypeChecked,
                                        ],
                                rules:{
                                        "no-console":"error", // to show error if there are any console.logs in the code
                                        quotes:["error","single",{allowTemplateLiterals:true}]
                                }
                                })```
        5. now run npx eslint . you will see the eslint error in the terminal
        6. add the following scripts in the package.json
                "lint": "eslint", (for linting)
                "lint:fix":"eslint --fix", (for possible fixes for lint errors)

H. setting up lint-staged
        1. after liscence add following in the package.json
                "lint-staged":{
                                "*.ts":[
                                        "npm run lint:fix"
                                        ]
                                },
        2. add following into .husky/pre-commit
                ```#!/usr/bin/env sh
                . "${dirname -- "$0"}/_/husky.sh"

                npx lint-staged```
        3. now if you try to commit without following the eslint rules you will get errors in console

I. setting up prettier
        1. npm install --save-dev --save-exact prettier
        2. create file .prettierrc in root
        3. add prettier rules in this file

J. binding eslint and prettier together so they can work together
        1. npm install --save-dev eslint-config-prettier
        2. go to eslint.config.mjs
                import eslintConfigPrettier from 'eslint-config-prettier'
                now add the eslintConfigPrettier in the extend array 
        3. now eslint and prettier will work together
        4. create scripts in package.json
                 "format:check":"prettier . --check",
                 "format:fix":"prettier . --fix",
        5 add  "npm run format:fix" in lint-staged script in package.json