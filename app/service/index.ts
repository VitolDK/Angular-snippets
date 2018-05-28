import { LinkService } from './link.service';
import { UtilsService } from './utils.service';
import { ProjectService } from './project.service';
import { UserService } from './user.service';
import { LocationsService } from './locations.service';
import { WorkTimeService } from './work-time.service';
import { InteriorService } from './interior.service';
import { MainLayoutService } from './main-layout.service';
import { ProductService } from './product.service';
import { MixPanelService } from './mix-panel.service';

export * from './link.service';
export * from './utils.service';
export * from './project.service';
export * from './user.service';
export * from './locations.service';
export * from './work-time.service';
export * from './interior.service';
export * from './main-layout.service';
export * from './product.service';
export * from './mix-panel.service';

export const APP_SERVICES = [
  LinkService,
  UtilsService,
  ProjectService,
  UserService,
  LocationsService,
  WorkTimeService,
  InteriorService,
  MainLayoutService,
  ProductService,
  MixPanelService
];
