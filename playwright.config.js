import {defineConfig} from '@playwright/test';
export default defineConfig({
  testDir:'./tests',fullyParallel:false,workers:1,timeout:30000,
  use:{baseURL:'http://127.0.0.1:8790',headless:true,launchOptions:process.env.CI?{}:{channel:'chrome'},trace:'retain-on-failure'},
  webServer:{command:'node scripts/serve.mjs',url:'http://127.0.0.1:8790',env:{PORT:'8790'},reuseExistingServer:!process.env.CI},
});
