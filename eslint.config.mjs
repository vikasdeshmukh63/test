// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier'

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
    eslintConfigPrettier
  ],
  rules:{
    "no-console":"error", // to show error if there are any console.logs in the code
    quotes:["error","single",{allowTemplateLiterals:true}]
  }
})