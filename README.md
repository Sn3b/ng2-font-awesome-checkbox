# ng2-font-awesome-checkbox
A simple checkbox that uses a css "hack" to display text content (to use a FontAwesome icon) instead of the conventional checkbox, to be used in Angular2 projects.

**jQuery dependent!** [here](https://github.com/Sn3b/ng2-font-awesome-checkbox/blob/master/ng2-font-awesome-checkbox.component.ts#L83-L84)

### Usage:

```html
<form [formGroup]="myForm">
  <ng2-font-awesome-checkbox formControlName="user" [content]="'&#xf007;'"></ng2-font-awesome-checkbox>
</form>
```

```typescript
this.myForm = new FormGroup({
  user: new FormControl(true)
});
```
