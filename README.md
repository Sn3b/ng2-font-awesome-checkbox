# ng2-font-awesome-checkbox
A simple checkbox that uses a css "hack" to display text content (to use a FontAwesome icon) instead of the conventional checkbox, to be used in Angular2 projects.

[Demo](https://embed.plnkr.co/5NeGKz/)

### Usage:
#### Model-driven form:

```html
<form [formGroup]="myForm">
  <ng2-font-awesome-checkbox formControlName="doctor" [content]="'&#xf0f0;'"></ng2-font-awesome-checkbox>
</form>
```

```typescript
this.myForm = new FormGroup({
  user: new FormControl(true)
});
```

#### Template-driven form:

```html
<form #myForm="ngForm">
  <ng2-font-awesome-checkbox [(ngModel)]="myModel" [content]="'&#xf007;'" name="myControl" #myControl="ngModel"></ng2-font-awesome-checkbox>
</form>
```
