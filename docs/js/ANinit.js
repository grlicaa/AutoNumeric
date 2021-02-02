/**
 * ANinit.js v1.2.0 | THE RIGHT THING SOLUTIONS d.o.o. | Andrej Grlica | andrej.grlica@right-thing.solutions.si 
 * User with Oracle APEX plug-in to render data
 * © 2020 Andrej Grlica
 * Dependencies : autonumeric.js@4.6.0
 * Released under the MIT License.
 */
function ANIGinit(itemId, opt, isRplace) {
  var index = 0;
  const $item = $('#'+itemId).addClass('u-vh is-focusable js-ignoreChange');

	function ANgetNumStr(pVal) {
		var x = document.createElement("input");
			x.setAttribute("type", "hidden");
		
		var anElement  = new AutoNumeric(x, (isRplace?((""+pVal).replace(",",".")):pVal), opt );
		var lreturn = anElement.getFormatted();	
		var lclasses = $(x).attr("class");

		return {val:lreturn, class:lclasses};
	}

	function ANIGsetAliment() {
		var $elm = $("div[id^='"+itemId+"_'].ig-div-autonumeric:first").parent();
		if ($elm.hasClass("u-tE")) {
			$item.css("text-align","right");
		}
		else if ($elm.hasClass("u-tC")) {
			$item.css("text-align","center");
		}
	}


	function render(value) {
		var showVal = ANgetNumStr(value);
		const out = apex.util.htmlBuilder();
		out.markup('<div')
			.attr('class', 'ig-div-autonumeric '+(showVal.class?"ig-autonumeric-custom "+showVal.class:""))
			.attr('id', itemId+'_'+index+'_0')
			.markup('>')
			.content(showVal.val)
			.markup('</div>');

		index += 1;
		
		return out.toString();
	}

 	 $( document ).ready(function() {
		//add aliment
		ANIGsetAliment();
	});  


	apex.item.create(itemId, {
		setValue:function(pValue, pDisplayValue) {
			if (AutoNumeric.isManagedByAutoNumeric("#"+this.id)) {
				var el = AutoNumeric.getAutoNumericElement("#"+this.id);
				if (pValue)
					el.set((isRplace?((""+pValue).replace(",",".")):pValue));
				else
					el.set("");

				if (pValue == "" && el.settings.styleRules) {
					if (el.settings.styleRules.ranges) {
						Object.getOwnPropertyNames(el.settings.styleRules.ranges).forEach(function(val, idx, array) {
							if (val == "class")
								$item.removeClass(el.settings.styleRules.ranges[val]);
							});
					}
					else {
						Object.getOwnPropertyNames(el.settings.styleRules).forEach(function(val, idx, array) {
							$item.removeClass(el.settings.styleRules[val]);
						});
					}
				}				
				el.reformat();		  
			}
			else {
				$item.val((isRplace?((""+pValue).replace(",",".")):pValue) );
				new AutoNumeric("#"+this.id, opt );	
			}
		},
		getValue:function() {
			var lVal = "";
			if (AutoNumeric.isManagedByAutoNumeric("#"+this.id)) {
				var el = AutoNumeric.getAutoNumericElement("#"+this.id);
				if (el.get() && el.get() != "") {
					var result = el.getNumber();
					lVal = (isRplace?((""+result).replace(".",",")):""+result);
				}
			}
			return lVal;		
		},
		disable:function() {
			$item.closest('.ig-div-autonumeric').removeClass('ig-div-autonumeric-enabled');
			$item.closest('.ig-div-autonumeric').addClass('ig-div-autonumeric-disabled');
			$item.attr('readonly','readonly');
			$item.addClass('apex_disabled');
		},
		isDisabled: function() {
			return $item.closest('.ig-div-autonumeric').hasClass('ig-div-autonumeric-disabled');
		},	
		enable:function() {
			$item.closest('.ig-div-autonumeric').removeClass('ig-div-autonumeric-disabled');
			$item.closest('.ig-div-autonumeric').addClass('ig-div-autonumeric-enabled');
			$item.removeAttr('readonly');
			$item.removeClass('apex_disabled');
		},
		displayValueFor:function(value) {
			return render(value);
		}
	});
}

function ANForminit(itemId, opt, isRplace, pClass) {

	var $item = apex.jQuery("#"+itemId);

	new AutoNumeric("#"+itemId, opt);
	
	apex.widget.initPageItem(itemId, {
		setValue:function(pValue, pDisplayValue) {
			if (AutoNumeric.isManagedByAutoNumeric("#"+this.id)) {
				var el = AutoNumeric.getAutoNumericElement("#"+this.id);
				if (pValue)
					el.set((isRplace?((""+pValue).replace(",",".")):pValue));
				else
					el.set("");
	
				if (pValue == "" && el.settings.styleRules) {
					if (el.settings.styleRules.ranges) {
						Object.getOwnPropertyNames(el.settings.styleRules.ranges).forEach(function(val, idx, array) {
							if (val == "class")
							$item.removeClass(el.settings.styleRules.ranges[val]);
							});
					}
					else {
						Object.getOwnPropertyNames(el.settings.styleRules).forEach(function(val, idx, array) {
							$item.removeClass(el.settings.styleRules[val]);
						});
					}
				}				
				el.reformat();		  
			}
			else {
				$item.val((isRplace?((""+pValue).replace(",",".")):pValue) );
				new AutoNumeric("#"+this.id, opt );	
			}

		},
		isChanged:function() {
			return (this.node.defaultValue != (AutoNumeric.isManagedByAutoNumeric("#"+this.id) ? AutoNumeric.getNumber("#"+this.id) : this.getValue()));
		},
		getValue:function() {
			var lVal = "";
			if (AutoNumeric.isManagedByAutoNumeric("#"+this.id)) {
				var el = AutoNumeric.getAutoNumericElement("#"+this.id);
				if (el.get() && el.get() != "") {
					 var result = el.getNumber();
					 lVal = (isRplace?((""+result).replace(".",",")):""+result);
				 }
			}	
			return lVal;
		}
	  });

	if (pClass){
		$item.addClass(pClass);
	}	  

	$item.focusin(function(hnd) {
		$(this).parents(":eq(2)").addClass("is-active");
	});	 

	$item.focusout(function() {
		$(this).parents(":eq(2)").removeClass("is-active");
	});	
}
//# sourceMappingURL=ANinit.js.map
