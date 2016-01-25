# Nested form components in angular

A very simple experiment to show how to nest form components in an angular form, taking
advantage of the built in ng-form directive and FormController.

## Dependencies

```
bower install
```

## Demo
Simply load the index page via a web server in your browser. You will see two range inputs.

The idea of this is to demonstrate how a form component made up of many inputs, like a date
range or a user first and last name, can contain it's own validation while still allowing the form
that will be submitted to know that it contains invalid properties.

I have included a few range components that contain their own validation, and a required text input
that uses a core angular validation (ng-required directive).

## What is the point?
If we have a model that is computed from a few inputs, we don't want each input to be validated in
isolation. Therefore we bury the inputs in a directive called ng-form, which allows us to manually
set the validity of it, and hooks into a parent form to ensure that the parent knows that it
contains valid or invalid data.

## Goodbye link callback
In the past, we used the link function and required ngModel, however with the move toward
components, the migration path tells us to start using controller, controllerAs, and
bindToController.

If we want to use only a controller in a directive, how then to access the form?

Thanks to
(this post)[http://stackoverflow.com/questions/21574472/angularjs-cant-access-form-object-in-controller-scope]
it is clearly shown as being easy.

Attach the form the the view model you have created,

```
<div ng-controller="MainCtrl as main">
    <form name="main.formName">
        ...
    </form>
</div>
```

Now the formName property is available on `this`. I found that it is only there after the $digest
has run for the scope in question.
