import { ParallaxHeaderDirectiveModule } from '../../components/parallax-header/parallax-header.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgentpagePage } from './agentpage';

@NgModule({
  declarations: [
    AgentpagePage,
  ],
  imports: [
    IonicPageModule.forChild(AgentpagePage),
    ParallaxHeaderDirectiveModule
  ],
})
export class AgentpagePageModule {}
