Issue – WebParts inititialized multiple times during partial navigation causing memory issues.
Steps to reproduce:
1.	Create a Blank Communication site at /sites/bug-reproduction1
2.	Create another Blank Communication site at /sites/bug-reproduction2
3.	In /sites/bug-reproduction1, add the test-onepointfive app to the site. This SPFX app contains one WebPart.
4.	Add the Bug Reproduction WebPart to the page. This is a freshly yeoman generated 1.5.0 WebPart that only adds console.log() to track when webpart lifecycle event occur.
5.	Add a Link WebPart to the page, pointing to the home page of /sites/bug-reproduction2. Key here is it being cross site collection.
6.	With browser dev tools open, from the home page of /sites/bug-reproduction1, refresh the page. In the console, observe the webpart reporting its different phases (onInit, render). OnInit() is called one time, and render() is called one time.
7.	Click the link to navigate to /sites/bug-reproduction2. Observe an empty site with no webparts.
8.	Click the back button in the browser. Observe multiple onInit() and render() calls for the dev webpart.
Effect on IE11
When you navigate around the SharePoint site between site collections, the framework doesn’t dispose the instances of the webparts properly, and loads them multiple times. Each webpart that contains async logic makes its networks calls multiple times as well. In IE11, the memory starts to add up after only a few page loads and eventually crashes.

Since this issue seemed to appear at the time of an SPFX update that included changes to partial navigation, I suspect there is something in the update that changed the behavior.
