import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,

  UserServiceBindings
} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {Dslb4DataSource} from './datasources';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class LoopbackLearnApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);


    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);
    this.dataSource(Dslb4DataSource, UserServiceBindings.DATASOURCE_NAME);
    // NOTE: Datasource: Remote connection to db
    // NOTE: Repository: Encapsulates model and datasource to persist model behaviour.

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
