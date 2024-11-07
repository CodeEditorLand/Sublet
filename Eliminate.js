/**
 * @module Option
 *
 */
export default (await import("@playform/eliminate/Target/Function/Merge.js")).default((await import("@playform/pipe/Target/Variable/Option.js")).default, {
    Action: {
        Wrote: async (On) => {
            try {
                return (await import("@playform/eliminate/Target/Function/Output.js")).default(On.Buffer.toString());
            }
            catch (_Error) {
                console.log(_Error);
                return On.Buffer;
            }
        },
    },
    Path: new Map([
        [
            "./Dependency/Land/Dependency/Editor/build",
            "./Dependency/Land/Dependency/Editor/build",
        ],
        [
            "./Dependency/Land/Dependency/Editor/extensions",
            "./Dependency/Land/Dependency/Editor/extensions",
        ],
        [
            "./Dependency/Land/Dependency/Editor/scripts",
            "./Dependency/Land/Dependency/Editor/scripts",
        ],
        [
            "./Dependency/Land/Dependency/Editor/Source",
            "./Dependency/Land/Dependency/Editor/Source",
        ],
    ]),
    File: "**/*.ts",
    Exclude: (File) => (File.indexOf(".d.ts") !== -1 ? true : false),
});
