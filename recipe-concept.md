# Recipe Cencept

**Recipe**

- Id
- [CompositeUniqueKey] Name
- [CompositeUniqueKey] ChefId
- [CompositeUniqueKey] Variantion (Usually Empty, but if the same Chef decides to make 2 different recipes for the same Name. e.g. 'Name: Apfelkuchen', the Variation can be 'Name:Apfelkuchen;Variation:mit Zimt')
- ingredients result in amount of dishes
- PredecessorId _(The recipe id, this recipe derived from. If this is given, this Recipe is a "Variation of PredecessorRecipe")_
- Ingredients[]
- Components[]
- duration
- PublicNote[] _(Visible to anyone)_
- PrivateNote[] _(Only visible to the chef who created it)_

**Ingredients**

- Id
- Name

**Component**

- Id
- Order

**Instructions : Component**

- Normal
- Detailed?
- Remark(s)? _(Will be displayed colored, or underlined, with a tooltip for the remark)_

**Heading : Component**

- Text

> when mentiontioning steps (special syntax required), you can hold the linked text, to open a virtual space displaying the linked steps instructions
> when double tapping, you scroll position changes to it

> OOOR: hold and drag mouse (or finger) to the right to blend in the virtual space
> when you let go, the virtual space disapears
> when you drag and drop your mouse (or finger) a minimal distance to the left, you navigate to the step
