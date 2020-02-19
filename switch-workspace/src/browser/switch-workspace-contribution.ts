import { injectable, inject } from "inversify";
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from "@theia/core/lib/common";
import { FrontendApplication, FrontendApplicationContribution } from "@theia/core/lib/browser/frontend-application";
import { WorkspaceService } from "@theia/workspace/lib/browser/workspace-service";
import { FileSystem }  from '@theia/filesystem/lib/common'
import { CommonMenus } from "@theia/core/lib/browser";
import URI from '@theia/core/lib/common/uri';
import { ConfirmDialog } from '@theia/core/lib/browser/dialogs';

export const SwitchWorkspaceCommand = {
    id: 'SwitchWorkspace.command',
    label: "Shows a message"
};

@injectable()
export class SwitchWorkspaceCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(SwitchWorkspaceCommand, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}

@injectable()
export class SwitchWorkspaceMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: SwitchWorkspaceCommand.id,
            label: 'Say Hello'
        });
    }
}

@injectable()
export class SwitchWorkspaceFrontendContribution implements FrontendApplicationContribution {
    constructor(
        @inject(FileSystem) protected readonly fileSystem: FileSystem,
        @inject(WorkspaceService) protected readonly workspaceService: WorkspaceService,
    ) { }

    protected async switchWorkspace(event: any): Promise<void> {
        const dialog = new ConfirmDialog({
            title: 'Switch Workspace',
            msg: 'Please ensure that you have saved your current progress before switching.'
        });
        if (await dialog.open()) {
            await this.workspaceService.close();
            await this.workspaceService.open(new URI(event.data));
        }
    }
    
    protected callback(event : any): void {
        try {
            if ( event.data.startsWith('setImmediate') )
            {
                return;
            }
            alert("message arrived");
            alert(event.data)
            this.switchWorkspace(event);
          } catch (e) {
            alert("exception")
            console.error('Invalid json', event);
          }
          alert("did nothing");
        	  
    }
    
    onStart(app: FrontendApplication): void {
        alert("test");
        window.addEventListener("message", event => this.callback(event), false);
        alert("completed");
    }
}

