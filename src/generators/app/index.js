import 'babel/polyfill';
import path from 'path';
import { Base } from 'yeoman-generator';

export default class GeneratorYeomanBoilerplateEs6 extends Base {

  constructor(...args) {
    super(...args);

    this.argument('appName', {
      type: String,
      defaults: path.basename(process.cwd())
    });
  }

  initializing() {
    this.props = {};
  }

  get prompting() {

    return {

      appName() {

        let done = this.async();

        let prompts = [{
          type: 'input',
          name: 'applicationName',
          message: 'What\'s application name?',
          default: this.appName
        }];

        this.prompt(prompts, function (props) {
          Object.assign(this.props, props);

          done();
        }.bind(this));
      }
    };
  }

  writing() {
    // Write your files
    this.fs.write(this.destinationPath('README.md'), `# The name is: ${ this.props.applicationName }\n`);
    this.config.set('props', this.props);
  }

  default() {
    // Compose here with others Yeoman generator
  }

  installing() {
    // Install dependencies
  }

  end() {
    // End message
    this.log('End of generator-yeoman-boilerplate-es6!');
  }
}
