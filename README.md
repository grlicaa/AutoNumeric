# AutoNumeric (AN)

APEX Plug-in built on top of [AutoNumeric.js](http://autonumeric.org/) library.
Plugin even uses NLS setting, to detect database setting ".," or ".,".

## Demo
A demo application is available on apex.oracle.com<br/>
https://apex.oracle.com/pls/apex/f?p=122979

## Preview
![](https://github.com/grlicaa/AutoNumeric/blob/master/docs/preview/AutoNumericPreview.gif)

## Install

### New install
<ol>
<li>Import plug-in "item_type_plugin_si_trts_autonumeric.sql" into your application.</li>
<li>Add Item on page or Interactive Grid</li>
<li>Choose AutoNumeric[Plug-in] for Item type on Page item or Interactive Grid column</li>
<li>Save changes. AutoNumeric is now ready to use.</li>
<li>Please leave some feedback. Thanks!</li>
</ol>


### Tested On (so far):

#### Browsers
<ul>
<li>FireFox 65.0</li>
<li>Chrome 71.0.3578.98</li>
<li>Microsoft Edge 42.17134.1.0</li>
<li>IE 11.523</li>
</ul>


#### Oracle APEX Versions
<ul>
<li>Application Express 18.2</li>
<li>Application Express 19.1</li>
<li>Application Express 19.2</li>
<li>Application Express 20.1</li>
</ul>


## Item settings

### ITEM Options

#### Interactive Grid

##### Settings
Here you can set up options of your AutoNumeric field. For more options and details please visit AutoNumeric  [configurator](http://autonumeric.org/configurator).
##### Aliment
Filed uses aliment defined by column attribute.
##### Padding size
If you use coloring css styles or ranges add class <strong>"padding-none"</strong> to column to get full size.<br>
With this we set padding:0px;

#### Form item

##### Settings
Here you can set up options of your AutoNumeric field. For more options and details please visit AutoNumeric  [configurator](http://autonumeric.org/configurator).
##### Aliment<
Field is basically text field, but can be align with a "Advanced Custom Attribute" setting :<br/>
style="text-align:right;"


### Examples
#### Default
<pre>
{
    currencySymbol: " €",
    currencySymbolPlacement: "s"
}
</pre><br>
#### Format 1.000.000,00
<pre>
{
    currencySymbol: " €",
    currencySymbolPlacement: "s",
    decimalCharacter: ",",
    decimalCharacterAlternative: ".",
    digitGroupSeparator: "."
}
</pre><br>
#### Simple style
<pre>
{
     styleRules: {
        positive: "u-color-4",
        negative: "u-color-9"
    }
}
</pre><br>
#### Range style
<pre>
{   currencySymbol: " %",
    currencySymbolPlacement: "s",
    styleRules: {
        ranges: [
            {
                min: 0,
                max: 25,
                class: "u-color-2"
            },
            {
                min: 25,
                max: 50,
                class: "u-color-4"
            },
            {
                min: 50,
                max: 75,
                class: "u-color-8"
            },
            {
                min: 75,
                max: 100,
                class: "u-color-9"
            }
        ]
    }
}
</pre>

#### CSS Style
To use styles or range style add following css inline 
<pre>
/* Form item */
.an_color .apex-item-text.u-color-4:focus {
    background-color: #3CAF85 !important;
    fill: #3CAF85 !important;
    color: #f0faf6 !important;
}
.an_color .apex-item-text.u-color-9:focus {
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
</pre>
More on css clsses on [Universal Theme references](https://apex.oracle.com/pls/apex/apex_pm/r/ut/color-and-status-modifiers).


## About me
Andrej Grlica<br/>
Company The Right Thing Solutions<br/>
I have been an Oracle APEX Developer since 2008<br/>
When I'm not focusing on a code problem, you can find me on:<br/>
Work Email : [andrej.grlica@right-thing.solutions](mailto:andrej.grlica@right-thing.solutions)<br/>
Private Email : [andrej.grlica@gmail.com](mailto:andrej.grlica@gmail.com)<br/>
LinkedIn: [Link](https://www.linkedin.com/in/andrej-grlica-303998a4/)<br/>
Slack (#orclapex) PM:[@grlicaa](https://orclapex.slack.com/messages/@grlicaa/)
