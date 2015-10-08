import { join as pathsJoin } from 'path';
import { test as helpers } from 'yeoman-generator';
import assert from 'yeoman-assert';

describe('yeoman-boilerplate-es6:app', () => {
  before(function (done) {
    this.answers = {
      applicationName: 'unicorn-es6'
    };
    helpers.run(pathsJoin(__dirname, '../generators/app'))
      .withPrompts(this.answers)
      .on('end', done);
  });

  it('should creates file', () => {
    assert.file([
      'README.md'
    ]);
  });

  it('should use application name to fill file', () => {
    assert.fileContent('README.md', 'unicorn-es6');
  });

  it('should have more unit test!', () => {
    assert(false, 'we expected this package author to add actual unit tests.');
  });
});
