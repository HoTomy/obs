{ pkgs }: {
    deps = [
        pkgs.nodejs-16_x
        pkgs.npm i koa/corsnpm i koa-static-folder
        pkgs.yarn
        pkgs.esbuild
        pkgs.nodejs-18_x

        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
    ];
}