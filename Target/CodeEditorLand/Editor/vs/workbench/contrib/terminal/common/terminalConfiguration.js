import{Codicon as g}from"../../../../base/common/codicons.js";import{isMacintosh as l,isWindows as f}from"../../../../base/common/platform.js";import{localize as e}from"../../../../nls.js";import{ConfigurationScope as a,Extensions as b}from"../../../../platform/configuration/common/configurationRegistry.js";import{Registry as s}from"../../../../platform/registry/common/platform.js";import{TerminalLocationString as d,TerminalSettingId as t}from"../../../../platform/terminal/common/terminal.js";import{terminalColorSchema as y,terminalIconSchema as v}from"../../../../platform/terminal/common/terminalPlatformConfiguration.js";import{Extensions as k}from"../../../common/configuration.js";import{terminalContribConfiguration as C}from"../terminalContribExports.js";import{DEFAULT_COMMANDS_TO_SKIP_SHELL as S,DEFAULT_LETTER_SPACING as T,DEFAULT_LINE_HEIGHT as D,MAXIMUM_FONT_WEIGHT as h,MINIMUM_FONT_WEIGHT as m,SUGGESTIONS_FONT_WEIGHT as c}from"./terminal.js";const u=`
- `+["`${cwd}`: "+e("cwd","the terminal's current working directory"),"`${cwdFolder}`: "+e("cwdFolder","the terminal's current working directory, displayed for multi-root workspaces or in a single root workspace when the value differs from the initial working directory. On Windows, this will only be displayed when shell integration is enabled."),"`${workspaceFolder}`: "+e("workspaceFolder","the workspace in which the terminal was launched"),"`${workspaceFolderName}`: "+e("workspaceFolderName","the `name` of the workspace in which the terminal was launched"),"`${local}`: "+e("local","indicates a local terminal in a remote workspace"),"`${process}`: "+e("process","the name of the terminal process"),"`${separator}`: "+e("separator","a conditional separator {0} that only shows when surrounded by variables with values or static text.","(` - `)"),"`${sequence}`: "+e("sequence","the name provided to the terminal by the process"),"`${task}`: "+e("task","indicates this terminal is associated with a task")].join(`
- `);let p=e("terminalTitle","Controls the terminal title. Variables are substituted based on the context:");p+=u;let w=e("terminalDescription","Controls the terminal description, which appears to the right of the title. Variables are substituted based on the context:");w+=u;const x=l?12:14,A={id:"terminal",order:100,title:e("terminalIntegratedConfigurationTitle","Integrated Terminal"),type:"object",properties:{[t.SendKeybindingsToShell]:{markdownDescription:e("terminal.integrated.sendKeybindingsToShell","Dispatches most keybindings to the terminal instead of the workbench, overriding {0}, which can be used alternatively for fine tuning.","`#terminal.integrated.commandsToSkipShell#`"),type:"boolean",default:!1},[t.TabsDefaultColor]:{description:e("terminal.integrated.tabs.defaultColor","A theme color ID to associate with terminal icons by default."),...y,scope:a.RESOURCE},[t.TabsDefaultIcon]:{description:e("terminal.integrated.tabs.defaultIcon","A codicon ID to associate with terminal icons by default."),...v,default:g.terminal.id,scope:a.RESOURCE},[t.TabsEnabled]:{description:e("terminal.integrated.tabs.enabled","Controls whether terminal tabs display as a list to the side of the terminal. When this is disabled a dropdown will display instead."),type:"boolean",default:!0},[t.TabsEnableAnimation]:{description:e("terminal.integrated.tabs.enableAnimation","Controls whether terminal tab statuses support animation (eg. in progress tasks)."),type:"boolean",default:!0},[t.TabsHideCondition]:{description:e("terminal.integrated.tabs.hideCondition","Controls whether the terminal tabs view will hide under certain conditions."),type:"string",enum:["never","singleTerminal","singleGroup"],enumDescriptions:[e("terminal.integrated.tabs.hideCondition.never","Never hide the terminal tabs view"),e("terminal.integrated.tabs.hideCondition.singleTerminal","Hide the terminal tabs view when there is only a single terminal opened"),e("terminal.integrated.tabs.hideCondition.singleGroup","Hide the terminal tabs view when there is only a single terminal group opened")],default:"singleTerminal"},[t.TabsShowActiveTerminal]:{description:e("terminal.integrated.tabs.showActiveTerminal","Shows the active terminal information in the view. This is particularly useful when the title within the tabs aren't visible."),type:"string",enum:["always","singleTerminal","singleTerminalOrNarrow","never"],enumDescriptions:[e("terminal.integrated.tabs.showActiveTerminal.always","Always show the active terminal"),e("terminal.integrated.tabs.showActiveTerminal.singleTerminal","Show the active terminal when it is the only terminal opened"),e("terminal.integrated.tabs.showActiveTerminal.singleTerminalOrNarrow","Show the active terminal when it is the only terminal opened or when the tabs view is in its narrow textless state"),e("terminal.integrated.tabs.showActiveTerminal.never","Never show the active terminal")],default:"singleTerminalOrNarrow"},[t.TabsShowActions]:{description:e("terminal.integrated.tabs.showActions","Controls whether terminal split and kill buttons are displays next to the new terminal button."),type:"string",enum:["always","singleTerminal","singleTerminalOrNarrow","never"],enumDescriptions:[e("terminal.integrated.tabs.showActions.always","Always show the actions"),e("terminal.integrated.tabs.showActions.singleTerminal","Show the actions when it is the only terminal opened"),e("terminal.integrated.tabs.showActions.singleTerminalOrNarrow","Show the actions when it is the only terminal opened or when the tabs view is in its narrow textless state"),e("terminal.integrated.tabs.showActions.never","Never show the actions")],default:"singleTerminalOrNarrow"},[t.TabsLocation]:{type:"string",enum:["left","right"],enumDescriptions:[e("terminal.integrated.tabs.location.left","Show the terminal tabs view to the left of the terminal"),e("terminal.integrated.tabs.location.right","Show the terminal tabs view to the right of the terminal")],default:"right",description:e("terminal.integrated.tabs.location","Controls the location of the terminal tabs, either to the left or right of the actual terminal(s).")},[t.DefaultLocation]:{type:"string",enum:[d.Editor,d.TerminalView],enumDescriptions:[e("terminal.integrated.defaultLocation.editor","Create terminals in the editor"),e("terminal.integrated.defaultLocation.view","Create terminals in the terminal view")],default:"view",description:e("terminal.integrated.defaultLocation","Controls where newly created terminals will appear.")},[t.TabsFocusMode]:{type:"string",enum:["singleClick","doubleClick"],enumDescriptions:[e("terminal.integrated.tabs.focusMode.singleClick","Focus the terminal when clicking a terminal tab"),e("terminal.integrated.tabs.focusMode.doubleClick","Focus the terminal when double-clicking a terminal tab")],default:"doubleClick",description:e("terminal.integrated.tabs.focusMode","Controls whether focusing the terminal of a tab happens on double or single click.")},[t.MacOptionIsMeta]:{description:e("terminal.integrated.macOptionIsMeta","Controls whether to treat the option key as the meta key in the terminal on macOS."),type:"boolean",default:!1},[t.MacOptionClickForcesSelection]:{description:e("terminal.integrated.macOptionClickForcesSelection","Controls whether to force selection when using Option+click on macOS. This will force a regular (line) selection and disallow the use of column selection mode. This enables copying and pasting using the regular terminal selection, for example, when mouse mode is enabled in tmux."),type:"boolean",default:!1},[t.AltClickMovesCursor]:{markdownDescription:e("terminal.integrated.altClickMovesCursor","If enabled, alt/option + click will reposition the prompt cursor to underneath the mouse when {0} is set to {1} (the default value). This may not work reliably depending on your shell.","`#editor.multiCursorModifier#`","`'alt'`"),type:"boolean",default:!0},[t.CopyOnSelection]:{description:e("terminal.integrated.copyOnSelection","Controls whether text selected in the terminal will be copied to the clipboard."),type:"boolean",default:!1},[t.EnableMultiLinePasteWarning]:{markdownDescription:e("terminal.integrated.enableMultiLinePasteWarning","Controls whether to show a warning dialog when pasting multiple lines into the terminal."),type:"string",enum:["auto","always","never"],markdownEnumDescriptions:[e("terminal.integrated.enableMultiLinePasteWarning.auto",`Enable the warning but do not show it when:

- Bracketed paste mode is enabled (the shell supports multi-line paste natively)
- The paste is handled by the shell's readline (in the case of pwsh)`),e("terminal.integrated.enableMultiLinePasteWarning.always","Always show the warning if the text contains a new line."),e("terminal.integrated.enableMultiLinePasteWarning.never","Never show the warning.")],default:"auto"},[t.DrawBoldTextInBrightColors]:{description:e("terminal.integrated.drawBoldTextInBrightColors",'Controls whether bold text in the terminal will always use the "bright" ANSI color variant.'),type:"boolean",default:!0},[t.FontFamily]:{markdownDescription:e("terminal.integrated.fontFamily","Controls the font family of the terminal. Defaults to {0}'s value.","`#editor.fontFamily#`"),type:"string"},[t.FontSize]:{description:e("terminal.integrated.fontSize","Controls the font size in pixels of the terminal."),type:"number",default:x,minimum:6,maximum:100},[t.LetterSpacing]:{description:e("terminal.integrated.letterSpacing","Controls the letter spacing of the terminal. This is an integer value which represents the number of additional pixels to add between characters."),type:"number",default:T},[t.LineHeight]:{description:e("terminal.integrated.lineHeight","Controls the line height of the terminal. This number is multiplied by the terminal font size to get the actual line-height in pixels."),type:"number",default:D},[t.MinimumContrastRatio]:{markdownDescription:e("terminal.integrated.minimumContrastRatio",`When set, the foreground color of each cell will change to try meet the contrast ratio specified. Note that this will not apply to \`powerline\` characters per #146406. Example values:

- 1: Do nothing and use the standard theme colors.
- 4.5: [WCAG AA compliance (minimum)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) (default).
- 7: [WCAG AAA compliance (enhanced)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast7.html).
- 21: White on black or black on white.`),type:"number",default:4.5,tags:["accessibility"]},[t.TabStopWidth]:{markdownDescription:e("terminal.integrated.tabStopWidth","The number of cells in a tab stop."),type:"number",minimum:1,default:8},[t.FastScrollSensitivity]:{markdownDescription:e("terminal.integrated.fastScrollSensitivity","Scrolling speed multiplier when pressing `Alt`."),type:"number",default:5},[t.MouseWheelScrollSensitivity]:{markdownDescription:e("terminal.integrated.mouseWheelScrollSensitivity","A multiplier to be used on the `deltaY` of mouse wheel scroll events."),type:"number",default:1},[t.BellDuration]:{markdownDescription:e("terminal.integrated.bellDuration","The number of milliseconds to show the bell within a terminal tab when triggered."),type:"number",default:1e3},[t.FontWeight]:{anyOf:[{type:"number",minimum:m,maximum:h,errorMessage:e("terminal.integrated.fontWeightError",'Only "normal" and "bold" keywords or numbers between 1 and 1000 are allowed.')},{type:"string",pattern:"^(normal|bold|1000|[1-9][0-9]{0,2})$"},{enum:c}],description:e("terminal.integrated.fontWeight",'The font weight to use within the terminal for non-bold text. Accepts "normal" and "bold" keywords or numbers between 1 and 1000.'),default:"normal"},[t.FontWeightBold]:{anyOf:[{type:"number",minimum:m,maximum:h,errorMessage:e("terminal.integrated.fontWeightError",'Only "normal" and "bold" keywords or numbers between 1 and 1000 are allowed.')},{type:"string",pattern:"^(normal|bold|1000|[1-9][0-9]{0,2})$"},{enum:c}],description:e("terminal.integrated.fontWeightBold",'The font weight to use within the terminal for bold text. Accepts "normal" and "bold" keywords or numbers between 1 and 1000.'),default:"bold"},[t.CursorBlinking]:{description:e("terminal.integrated.cursorBlinking","Controls whether the terminal cursor blinks."),type:"boolean",default:!1},[t.CursorStyle]:{description:e("terminal.integrated.cursorStyle","Controls the style of terminal cursor when the terminal is focused."),enum:["block","line","underline"],default:"block"},[t.CursorStyleInactive]:{description:e("terminal.integrated.cursorStyleInactive","Controls the style of terminal cursor when the terminal is not focused."),enum:["outline","block","line","underline","none"],default:"outline"},[t.CursorWidth]:{markdownDescription:e("terminal.integrated.cursorWidth","Controls the width of the cursor when {0} is set to {1}.","`#terminal.integrated.cursorStyle#`","`line`"),type:"number",default:1},[t.Scrollback]:{description:e("terminal.integrated.scrollback","Controls the maximum number of lines the terminal keeps in its buffer. We pre-allocate memory based on this value in order to ensure a smooth experience. As such, as the value increases, so will the amount of memory."),type:"number",default:1e3},[t.DetectLocale]:{markdownDescription:e("terminal.integrated.detectLocale","Controls whether to detect and set the `$LANG` environment variable to a UTF-8 compliant option since VS Code's terminal only supports UTF-8 encoded data coming from the shell."),type:"string",enum:["auto","off","on"],markdownEnumDescriptions:[e("terminal.integrated.detectLocale.auto","Set the `$LANG` environment variable if the existing variable does not exist or it does not end in `'.UTF-8'`."),e("terminal.integrated.detectLocale.off","Do not set the `$LANG` environment variable."),e("terminal.integrated.detectLocale.on","Always set the `$LANG` environment variable.")],default:"auto"},[t.GpuAcceleration]:{type:"string",enum:["auto","on","off"],markdownEnumDescriptions:[e("terminal.integrated.gpuAcceleration.auto","Let VS Code detect which renderer will give the best experience."),e("terminal.integrated.gpuAcceleration.on","Enable GPU acceleration within the terminal."),e("terminal.integrated.gpuAcceleration.off","Disable GPU acceleration within the terminal. The terminal will render much slower when GPU acceleration is off but it should reliably work on all systems.")],default:"auto",description:e("terminal.integrated.gpuAcceleration","Controls whether the terminal will leverage the GPU to do its rendering.")},[t.TerminalTitleSeparator]:{type:"string",default:" - ",markdownDescription:e("terminal.integrated.tabs.separator","Separator used by {0} and {1}.",`\`#${t.TerminalTitle}#\``,`\`#${t.TerminalDescription}#\``)},[t.TerminalTitle]:{type:"string",default:"${process}",markdownDescription:p},[t.TerminalDescription]:{type:"string",default:"${task}${separator}${local}${separator}${cwdFolder}",markdownDescription:w},[t.RightClickBehavior]:{type:"string",enum:["default","copyPaste","paste","selectWord","nothing"],enumDescriptions:[e("terminal.integrated.rightClickBehavior.default","Show the context menu."),e("terminal.integrated.rightClickBehavior.copyPaste","Copy when there is a selection, otherwise paste."),e("terminal.integrated.rightClickBehavior.paste","Paste on right click."),e("terminal.integrated.rightClickBehavior.selectWord","Select the word under the cursor and show the context menu."),e("terminal.integrated.rightClickBehavior.nothing","Do nothing and pass event to terminal.")],default:l?"selectWord":f?"copyPaste":"default",description:e("terminal.integrated.rightClickBehavior","Controls how terminal reacts to right click.")},[t.MiddleClickBehavior]:{type:"string",enum:["default","paste"],enumDescriptions:[e("terminal.integrated.middleClickBehavior.default","The platform default to focus the terminal. On Linux this will also paste the selection."),e("terminal.integrated.middleClickBehavior.paste","Paste on middle click.")],default:"default",description:e("terminal.integrated.middleClickBehavior","Controls how terminal reacts to middle click.")},[t.Cwd]:{restricted:!0,description:e("terminal.integrated.cwd","An explicit start path where the terminal will be launched, this is used as the current working directory (cwd) for the shell process. This may be particularly useful in workspace settings if the root directory is not a convenient cwd."),type:"string",default:void 0,scope:a.RESOURCE},[t.ConfirmOnExit]:{description:e("terminal.integrated.confirmOnExit","Controls whether to confirm when the window closes if there are active terminal sessions."),type:"string",enum:["never","always","hasChildProcesses"],enumDescriptions:[e("terminal.integrated.confirmOnExit.never","Never confirm."),e("terminal.integrated.confirmOnExit.always","Always confirm if there are terminals."),e("terminal.integrated.confirmOnExit.hasChildProcesses","Confirm if there are any terminals that have child processes.")],default:"never"},[t.ConfirmOnKill]:{description:e("terminal.integrated.confirmOnKill","Controls whether to confirm killing terminals when they have child processes. When set to editor, terminals in the editor area will be marked as changed when they have child processes. Note that child process detection may not work well for shells like Git Bash which don't run their processes as child processes of the shell."),type:"string",enum:["never","editor","panel","always"],enumDescriptions:[e("terminal.integrated.confirmOnKill.never","Never confirm."),e("terminal.integrated.confirmOnKill.editor","Confirm if the terminal is in the editor."),e("terminal.integrated.confirmOnKill.panel","Confirm if the terminal is in the panel."),e("terminal.integrated.confirmOnKill.always","Confirm if the terminal is either in the editor or panel.")],default:"editor"},[t.EnableBell]:{markdownDeprecationMessage:e("terminal.integrated.enableBell","This is now deprecated. Instead use the `terminal.integrated.enableVisualBell` and `accessibility.signals.terminalBell` settings."),type:"boolean",default:!1},[t.EnableVisualBell]:{description:e("terminal.integrated.enableVisualBell","Controls whether the visual terminal bell is enabled. This shows up next to the terminal's name."),type:"boolean",default:!1},[t.CommandsToSkipShell]:{markdownDescription:e("terminal.integrated.commandsToSkipShell",`A set of command IDs whose keybindings will not be sent to the shell but instead always be handled by VS Code. This allows keybindings that would normally be consumed by the shell to act instead the same as when the terminal is not focused, for example \`Ctrl+P\` to launch Quick Open.

&nbsp;

Many commands are skipped by default. To override a default and pass that command's keybinding to the shell instead, add the command prefixed with the \`-\` character. For example add \`-workbench.action.quickOpen\` to allow \`Ctrl+P\` to reach the shell.

&nbsp;

The following list of default skipped commands is truncated when viewed in Settings Editor. To see the full list, {1} and search for the first command from the list below.

&nbsp;

Default Skipped Commands:

{0}`,S.sort().map(n=>`- ${n}`).join(`
`),`[${e("openDefaultSettingsJson","open the default settings JSON")}](command:workbench.action.openRawDefaultSettings '${e("openDefaultSettingsJson.capitalized","Open Default Settings (JSON)")}')`),type:"array",items:{type:"string"},default:[]},[t.AllowChords]:{markdownDescription:e("terminal.integrated.allowChords","Whether or not to allow chord keybindings in the terminal. Note that when this is true and the keystroke results in a chord it will bypass {0}, setting this to false is particularly useful when you want ctrl+k to go to your shell (not VS Code).","`#terminal.integrated.commandsToSkipShell#`"),type:"boolean",default:!0},[t.AllowMnemonics]:{markdownDescription:e("terminal.integrated.allowMnemonics","Whether to allow menubar mnemonics (for example Alt+F) to trigger the open of the menubar. Note that this will cause all alt keystrokes to skip the shell when true. This does nothing on macOS."),type:"boolean",default:!1},[t.EnvMacOs]:{restricted:!0,markdownDescription:e("terminal.integrated.env.osx","Object with environment variables that will be added to the VS Code process to be used by the terminal on macOS. Set to `null` to delete the environment variable."),type:"object",additionalProperties:{type:["string","null"]},default:{}},[t.EnvLinux]:{restricted:!0,markdownDescription:e("terminal.integrated.env.linux","Object with environment variables that will be added to the VS Code process to be used by the terminal on Linux. Set to `null` to delete the environment variable."),type:"object",additionalProperties:{type:["string","null"]},default:{}},[t.EnvWindows]:{restricted:!0,markdownDescription:e("terminal.integrated.env.windows","Object with environment variables that will be added to the VS Code process to be used by the terminal on Windows. Set to `null` to delete the environment variable."),type:"object",additionalProperties:{type:["string","null"]},default:{}},[t.EnvironmentChangesIndicator]:{markdownDescription:e("terminal.integrated.environmentChangesIndicator","Whether to display the environment changes indicator on each terminal which explains whether extensions have made, or want to make changes to the terminal's environment."),type:"string",enum:["off","on","warnonly"],enumDescriptions:[e("terminal.integrated.environmentChangesIndicator.off","Disable the indicator."),e("terminal.integrated.environmentChangesIndicator.on","Enable the indicator."),e("terminal.integrated.environmentChangesIndicator.warnonly","Only show the warning indicator when a terminal's environment is 'stale', not the information indicator that shows a terminal has had its environment modified by an extension.")],default:"warnonly"},[t.EnvironmentChangesRelaunch]:{markdownDescription:e("terminal.integrated.environmentChangesRelaunch","Whether to relaunch terminals automatically if extensions want to contribute to their environment and have not been interacted with yet."),type:"boolean",default:!0},[t.ShowExitAlert]:{description:e("terminal.integrated.showExitAlert",'Controls whether to show the alert "The terminal process terminated with exit code" when exit code is non-zero.'),type:"boolean",default:!0},[t.ExperimentalWindowsUseConptyDll]:{markdownDescription:e("terminal.integrated.experimentalWindowsUseConptyDll","Whether to use the experimental conpty.dll shipped with VS Code, instead of the one bundled with Windows."),type:"boolean",default:!1},[t.SplitCwd]:{description:e("terminal.integrated.splitCwd","Controls the working directory a split terminal starts with."),type:"string",enum:["workspaceRoot","initial","inherited"],enumDescriptions:[e("terminal.integrated.splitCwd.workspaceRoot","A new split terminal will use the workspace root as the working directory. In a multi-root workspace a choice for which root folder to use is offered."),e("terminal.integrated.splitCwd.initial","A new split terminal will use the working directory that the parent terminal started with."),e("terminal.integrated.splitCwd.inherited","On macOS and Linux, a new split terminal will use the working directory of the parent terminal. On Windows, this behaves the same as initial.")],default:"inherited"},[t.WindowsEnableConpty]:{description:e("terminal.integrated.windowsEnableConpty","Whether to use ConPTY for Windows terminal process communication (requires Windows 10 build number 18309+). Winpty will be used if this is false."),type:"boolean",default:!0},[t.WordSeparators]:{markdownDescription:e("terminal.integrated.wordSeparators","A string containing all characters to be considered word separators when double-clicking to select word and in the fallback 'word' link detection. Since this is used for link detection, including characters such as `:` that are used when detecting links will cause the line and column part of links like `file:10:5` to be ignored."),type:"string",default:" ()[]{}',\"`\u2500\u2018\u2019\u201C\u201D|"},[t.EnableFileLinks]:{description:e("terminal.integrated.enableFileLinks","Whether to enable file links in terminals. Links can be slow when working on a network drive in particular because each file link is verified against the file system. Changing this will take effect only in new terminals."),type:"string",enum:["off","on","notRemote"],enumDescriptions:[e("enableFileLinks.off","Always off."),e("enableFileLinks.on","Always on."),e("enableFileLinks.notRemote","Enable only when not in a remote workspace.")],default:"on"},[t.AllowedLinkSchemes]:{description:e("terminal.integrated.allowedLinkSchemes","An array of strings containing the URI schemes that the terminal is allowed to open links for. By default, only a small subset of possible schemes are allowed for security reasons."),type:"array",items:{type:"string"},default:["file","http","https","mailto","vscode","vscode-insiders"]},[t.UnicodeVersion]:{type:"string",enum:["6","11"],enumDescriptions:[e("terminal.integrated.unicodeVersion.six","Version 6 of Unicode. This is an older version which should work better on older systems."),e("terminal.integrated.unicodeVersion.eleven","Version 11 of Unicode. This version provides better support on modern systems that use modern versions of Unicode.")],default:"11",description:e("terminal.integrated.unicodeVersion","Controls what version of Unicode to use when evaluating the width of characters in the terminal. If you experience emoji or other wide characters not taking up the right amount of space or backspace either deleting too much or too little then you may want to try tweaking this setting.")},[t.EnablePersistentSessions]:{description:e("terminal.integrated.enablePersistentSessions","Persist terminal sessions/history for the workspace across window reloads."),type:"boolean",default:!0},[t.PersistentSessionReviveProcess]:{markdownDescription:e("terminal.integrated.persistentSessionReviveProcess",`When the terminal process must be shut down (for example on window or application close), this determines when the previous terminal session contents/history should be restored and processes be recreated when the workspace is next opened.

Caveats:

- Restoring of the process current working directory depends on whether it is supported by the shell.
- Time to persist the session during shutdown is limited, so it may be aborted when using high-latency remote connections.`),type:"string",enum:["onExit","onExitAndWindowClose","never"],markdownEnumDescriptions:[e("terminal.integrated.persistentSessionReviveProcess.onExit","Revive the processes after the last window is closed on Windows/Linux or when the `workbench.action.quit` command is triggered (command palette, keybinding, menu)."),e("terminal.integrated.persistentSessionReviveProcess.onExitAndWindowClose","Revive the processes after the last window is closed on Windows/Linux or when the `workbench.action.quit` command is triggered (command palette, keybinding, menu), or when the window is closed."),e("terminal.integrated.persistentSessionReviveProcess.never","Never restore the terminal buffers or recreate the process.")],default:"onExit"},[t.HideOnStartup]:{description:e("terminal.integrated.hideOnStartup","Whether to hide the terminal view on startup, avoiding creating a terminal when there are no persistent sessions."),type:"string",enum:["never","whenEmpty","always"],markdownEnumDescriptions:[e("hideOnStartup.never","Never hide the terminal view on startup."),e("hideOnStartup.whenEmpty","Only hide the terminal when there are no persistent sessions restored."),e("hideOnStartup.always","Always hide the terminal, even when there are persistent sessions restored.")],default:"never"},[t.CustomGlyphs]:{markdownDescription:e("terminal.integrated.customGlyphs","Whether to draw custom glyphs for block element and box drawing characters instead of using the font, which typically yields better rendering with continuous lines. Note that this doesn't work when {0} is disabled.",`\`#${t.GpuAcceleration}#\``),type:"boolean",default:!0},[t.RescaleOverlappingGlyphs]:{markdownDescription:e("terminal.integrated.rescaleOverlappingGlyphs","Whether to rescale glyphs horizontally that are a single cell wide but have glyphs that would overlap following cell(s). This typically happens for ambiguous width characters (eg. the roman numeral characters U+2160+) which aren't featured in monospace fonts. Emoji glyphs are never rescaled."),type:"boolean",default:!0},[t.ShellIntegrationEnabled]:{restricted:!0,markdownDescription:e("terminal.integrated.shellIntegration.enabled",`Determines whether or not shell integration is auto-injected to support features like enhanced command tracking and current working directory detection. 

Shell integration works by injecting the shell with a startup script. The script gives VS Code insight into what is happening within the terminal.

Supported shells:

- Linux/macOS: bash, fish, pwsh, zsh
 - Windows: pwsh, git bash

This setting applies only when terminals are created, so you will need to restart your terminals for it to take effect.

 Note that the script injection may not work if you have custom arguments defined in the terminal profile, have enabled {1}, have a [complex bash \`PROMPT_COMMAND\`](https://code.visualstudio.com/docs/editor/integrated-terminal#_complex-bash-promptcommand), or other unsupported setup. To disable decorations, see {0}`,"`#terminal.integrated.shellIntegrations.decorationsEnabled#`","`#editor.accessibilitySupport#`"),type:"boolean",default:!0},[t.ShellIntegrationDecorationsEnabled]:{restricted:!0,markdownDescription:e("terminal.integrated.shellIntegration.decorationsEnabled","When shell integration is enabled, adds a decoration for each command."),type:"string",enum:["both","gutter","overviewRuler","never"],enumDescriptions:[e("terminal.integrated.shellIntegration.decorationsEnabled.both","Show decorations in the gutter (left) and overview ruler (right)"),e("terminal.integrated.shellIntegration.decorationsEnabled.gutter","Show gutter decorations to the left of the terminal"),e("terminal.integrated.shellIntegration.decorationsEnabled.overviewRuler","Show overview ruler decorations to the right of the terminal"),e("terminal.integrated.shellIntegration.decorationsEnabled.never","Do not show decorations")],default:"both"},[t.ShellIntegrationCommandHistory]:{restricted:!0,markdownDescription:e("terminal.integrated.shellIntegration.history","Controls the number of recently used commands to keep in the terminal command history. Set to 0 to disable terminal command history."),type:"number",default:100},[t.SmoothScrolling]:{markdownDescription:e("terminal.integrated.smoothScrolling","Controls whether the terminal will scroll using an animation."),type:"boolean",default:!1},[t.IgnoreBracketedPasteMode]:{markdownDescription:e("terminal.integrated.ignoreBracketedPasteMode","Controls whether the terminal will ignore bracketed paste mode even if the terminal was put into the mode, omitting the {0} and {1} sequences when pasting. This is useful when the shell is not respecting the mode which can happen in sub-shells for example.","`\\x1b[200~`","`\\x1b[201~`"),type:"boolean",default:!1},[t.EnableImages]:{restricted:!0,markdownDescription:e("terminal.integrated.enableImages","Enables image support in the terminal, this will only work when {0} is enabled. Both sixel and iTerm's inline image protocol are supported on Linux and macOS, Windows support will light up automatically when ConPTY passes through the sequences. Images will currently not be restored between window reloads/reconnects.",`\`#${t.GpuAcceleration}#\``),type:"boolean",default:!1},[t.FocusAfterRun]:{markdownDescription:e("terminal.integrated.focusAfterRun","Controls whether the terminal, accessible buffer, or neither will be focused after `Terminal: Run Selected Text In Active Terminal` has been run."),enum:["terminal","accessible-buffer","none"],default:"none",tags:["accessibility"],markdownEnumDescriptions:[e("terminal.integrated.focusAfterRun.terminal","Always focus the terminal."),e("terminal.integrated.focusAfterRun.accessible-buffer","Always focus the accessible buffer."),e("terminal.integrated.focusAfterRun.none","Do nothing.")]},...C}};function V(){s.as(b.Configuration).registerConfiguration(A)}s.as(k.ConfigurationMigration).registerConfigurationMigrations([{key:t.EnableBell,migrateFn:(n,o)=>{const r=[];let i=o("accessibility.signals.terminalBell")?.announcement??o("accessibility.alert.terminalBell");return i!==void 0&&typeof i!="string"&&(i=i?"auto":"off"),r.push(["accessibility.signals.terminalBell",{value:{sound:n?"on":"off",announcement:i}}]),r.push([t.EnableBell,{value:void 0}]),r.push([t.EnableVisualBell,{value:n}]),r}}]);export{x as defaultTerminalFontSize,V as registerTerminalConfiguration};
