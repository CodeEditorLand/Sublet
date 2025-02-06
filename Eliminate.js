/**
 * @module Option
 *
 */
export default (await import("@playform/eliminate/Target/Function/Merge.js")).default((await import("@playform/pipe/Target/Variable/Option.js")).default, {
    Action: {
        Wrote: async (On) => {
            try {
                return (await import("@playform/eliminate/Target/Function/Output.js")).default(On.Buffer.toString(), {
                    Comment: true,
                });
            }
            catch (_Error) {
                console.log(_Error);
                return On.Buffer;
            }
        },
        Failed: async ({ Input }, _Error) => {
            console.log(_Error);
            return `Error: Cannot process file ${Input}`;
        },
    },
    Path: new Map([
        [
            "./Dependency/Microsoft/Dependency/Editor/build",
            "./Dependency/Microsoft/Dependency/Editor/build",
        ],
        [
            "./Dependency/Microsoft/Dependency/Editor/extensions",
            "./Dependency/Microsoft/Dependency/Editor/extensions",
        ],
        [
            "./Dependency/Microsoft/Dependency/Editor/scripts",
            "./Dependency/Microsoft/Dependency/Editor/scripts",
        ],
        [
            "./Dependency/Microsoft/Dependency/Editor/Source",
            "./Dependency/Microsoft/Dependency/Editor/Source",
        ],
    ]),
    File: "**/*.ts",
    Exclude: (File) => (File.indexOf(".d.ts") !== -1 ? true : false),
});
