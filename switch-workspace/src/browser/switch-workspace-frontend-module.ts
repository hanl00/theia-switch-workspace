/**
 * Generated using theia-extension-generator
 */

import { SwitchWorkspaceCommandContribution, SwitchWorkspaceMenuContribution, SwitchWorkspaceFrontendContribution } from './switch-workspace-contribution';
import {
    CommandContribution,
    MenuContribution,
} from "@theia/core/lib/common";

import { FrontendApplicationContribution } from "@theia/core/lib/browser/frontend-application";

import { ContainerModule } from "inversify";

export default new ContainerModule(bind => {
    // add your contribution bindings here
    
    bind(CommandContribution).to(SwitchWorkspaceCommandContribution);
    bind(MenuContribution).to(SwitchWorkspaceMenuContribution);
    bind(FrontendApplicationContribution).to(SwitchWorkspaceFrontendContribution);
    
});
