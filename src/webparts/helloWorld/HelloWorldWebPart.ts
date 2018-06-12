import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'HelloWorldWebPartStrings';
import HelloWorld from './components/HelloWorld';
import { IHelloWorldProps } from './components/IHelloWorldProps';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  protected onInit() {
    console.log("BugReproductionWebPart: onInit");
    return Promise.resolve<void>();
  }
  public async getData(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 5000);
    });
  }
  public render(): void {
    console.log("BugReproductionWebPart: render");
    console.log("BugReproductionWebPart: renderedOnce", this.renderedOnce);
    const element: React.ReactElement<IHelloWorldProps > = React.createElement(
      HelloWorld,
      {
        description: this.properties.description
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    console.log("BugReproductionWebPart: onDispose");
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
