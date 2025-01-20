// @ts-check

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
})