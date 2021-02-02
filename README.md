# AutoNumeric (AN)

APEX Plug-in built on top of [AutoNumeric.js](http://autonumeric.org/) library.
Plugin even uses NLS setting, to detect database setting ".," or ",.".

## Demo

A demo application is available on
[https://apex.oracle.com/pls/apex/f?p=122979](https://apex.oracle.com/pls/apex/f?p=122979)

## Preview

![AutoNumericPreview.gif](https://github.com/grlicaa/AutoNumeric/blob/master/docs/preview/AutoNumericPreview.gif)

## Change log

### V 4.6.0.4 - 02.02.2021

- Added new parameter "Alignment" on page item [#2](https://github.com/grlicaa/AutoNumeric/issues/2)
- Fixed "Warn before exit for decimal" issue [#3](https://github.com/grlicaa/AutoNumeric/issues/3)
- Read only now follows APEX conventions [#4](https://github.com/grlicaa/AutoNumeric/issues/4)
- How to use global JS variable documentation  [#5](https://github.com/grlicaa/AutoNumeric/issues/5)
- Interactive Grid item improvements :
    1. Accessibility improvement ("Enter" key)
    2. Added support for "Placeholder" option

### V 4.6.0.3 - 06.12.2020

- Fixed "Warn on Unsaved Changes" issue [#1](https://github.com/grlicaa/AutoNumeric/issues/1)
- Documentation improvement

### V 4.6.0.2 - 19.11.2020

- Fixed APEX 20.2 "height: var" problem in css file

## Install

### New install

1. Import plug-in "item_type_plugin_si_trts_autonumeric.sql" into your application.
2. Add Item on page or Interactive Grid.
3. Choose AutoNumeric[Plug-in] for Item type on Page item or Interactive Grid column.
4. Save changes. AutoNumeric is now ready to use.
5. Please leave some feedback. Thanks!

### Tested On (so far)

#### Browsers

- FireFox 80.0
- Chrome 85.0
- Microsoft Edge 85.0
- IE 11.x

### Oracle APEX Versions

- Application Express 18.1
- Application Express 18.2
- Application Express 19.1
- Application Express 19.2
- Application Express 20.1
- Application Express 20.2

## Item settings

### ITEM Options

#### Interactive Grid

##### Settings

Here you can set up options of your AutoNumeric field. For more options and details please visit AutoNumeric  [configurator](http://autonumeric.org/configurator).

##### Alignment

Filed uses alignment defined by column attribute.

##### Padding size

If you use coloring css styles or ranges add class *"padding-none"* to column to get full size.
In this plug-in default setting per IG column is "padding:0px";

#### Form item

##### Usage

It can be used with following sample :

```javascript
apex.item("ITEM_NAME").setValue("3432.32");
apex.item("ITEM_NAME").getValue();
```

##### Alignment

Is now declarative option. In case when developer don't define position. Default setting from "Component settings" will be applied.

### ITEM options / examples

In this section are some default example on how to use ITEM options. For more options and details please visit AutoNumeric  [configurator](http://autonumeric.org/configurator).

Option can be per plug-in instance or global setting.
Global setting can be in two types :
    1. global JS variable (page, global)
       Example :
       ```javascript
            var an_options = {
                currencySymbol: " €",
                currencySymbolPlacement: "s",
                styleRules: {
                    positive: "u-color-4",
                    negative: "u-color-9"
                }
            };```
    2. substitution string (Examples: &AI_AN_OPTIONS., &APP_AN_OPTIONS.)

#### Default

```json
{
    "currencySymbol": " €",
    "currencySymbolPlacement": "s"
}
```

#### Format 1.000.000,00

```json
{
    "currencySymbol": " €",
    "currencySymbolPlacement": "s",
    "decimalCharacter": ",",
    "decimalCharacterAlternative": ".",
    "digitGroupSeparator": "."
}
```

#### Simple style

```json
{
     "styleRules": {
        "positive": "u-color-4",
        "negative": "u-color-9"
    }
}
```

#### Range style

```json
{   "currencySymbol": " %",
    "currencySymbolPlacement": "s",
    "styleRules": {
        "ranges": [
            {
                "min": 0,
                "max": 25,
                "class": "u-color-2"
            },
            {
                "min": 25,
                "max": 50,
                "class": "u-color-4"
            },
            {
                "min": 50,
                "max": 75,
                "class": "u-color-8"
            },
            {
                "min": 75,
                "max": 100,
                "class": "u-color-9"
            }
        ]
    }
}
```

#### CSS Style

To use styles or range style add following css inline

```css
/* Form item */
.apex-item-text.apex-item-autonumeric.u-color-4:focus {
    background-color: #3CAF85 !important;
    fill: #3CAF85 !important;
    color: #f0faf6 !important;
}
.apex-item-text.apex-item-autonumeric.u-color-9:focus {
    background-color: #E95B54 !important;
    fill: #E95B54 !important;
    color: #f0faf6 !important;
}

/* Interactive grid */
.ig-div-autonumeric .apex-item-text:focus.u-color-4:focus {
    background-color: #3CAF85 !important;
    fill: #3CAF85 !important;
    color: #f0faf6 !important;
}

.ig-div-autonumeric .apex-item-text:focus.u-color-9:focus {
    background-color: #E95B54 !important;
    fill: #E95B54 !important;
    color: #f0faf6 !important;
}
.ig-div-autonumeric .apex-item-text:focus.u-color-2:focus {
    background-color: #13B6CF !important;
    fill: #13B6CF !important;
    color: #f0faf6 !important;
}

.ig-div-autonumeric .apex-item-text:focus.u-color-8:focus {
    background-color: #ED813E  !important;
    fill: #ED813E  !important;
    color: #f0faf6 !important;
}
```

More on css classes on [Universal Theme references](https://apex.oracle.com/pls/apex/apex_pm/r/ut/color-and-status-modifiers).

## About me

Andrej Grlica
Company The RIGHT THING Solutions
I have been an Oracle APEX Developer since 2008
When I'm not focusing on a code problem, you can find me on:

- Work Email : [andrej.grlica@right-thing.solutions](mailto:andrej.grlica@right-thing.solutions)
- Private Email : [andrej.grlica@gmail.com](mailto:andrej.grlica@gmail.com)
- LinkedIn: [Link](https://www.linkedin.com/in/andrej-grlica-303998a4/)
- Twitter: [@AndrejGrlica](https://twitter.com/AndrejGrlica)
