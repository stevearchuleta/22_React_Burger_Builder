# 22_React_Burger_Builder
React Course: Maximilian Schwarzmuller's Burger Builder App
Steve Archuleta 06DEC2019


Burger Builder App
Planning 06DEC2019
1. Component Tree / Component Structure
2. Application State (Data)
3. Components vs. Containers


Header: Logo, Builder Tab, Orders Tab

Start Page: Builder Page
1. Area where burger is getting built layer-by-layer. See a preview of the burger as it is being built.
2. Controls Area: in a box: meat, lettuce, onion, bacon, mayo, etc... +(add button) -(remove button)
3. Checkout button (to purchase)
4. Price area (to see cost of burger)

Preliminary Component Tree 06DEC2019
Root Layout

APP Component 
|
LAYOUT Component - (4 subcomponents)
|
1. TOOLBAR subcomponent - html, button to toggle sidedrawer, logo, navigation items
2. SIDEDRAWER subcomponent - html, button to toggle sidedrawer, logo, navigation items
3. BACKDROP subcomponent (modal for checkout) -
4. {props.children} dynamic subcomponent - different pages including burger builder subcomponent
|
BURGER BUILDER Component (Stateful)
- a) Build Controls subcomponent, b) Burger preview subcomponent, c) Modal checkout summary preview
|
BUILD CONTROLS
*(List of build controls buttons)
E.g.: Build Control... Build Control... Build Control...etc...
*(Order button)
|
BURGER PREVIEW
*(Ingredients Components)
|
MODAL
*wrapper component that takes props.children to dynamically wrap itself around any content that I need to render in a modal. Then this modal becomes reusable. Confirmation message, error message, order summary.
￼
ENABLE/INSTALL CSS MODULES...to ensure that the css classes that I create in a css file can be scoped to a specific component in my app, such that they are not applied globally if I happen to use the same css class 