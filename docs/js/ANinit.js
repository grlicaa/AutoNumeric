/**
 * ANinit.js v1.0.1 | THE RIGHT THING SOLUTIONS d.o.o. | Andrej Grlica | andrej.grlica@right-thing.solutions.si 
 * User with Oracle APEX plug-in to render data
 * © 2020 Andrej Grlica
 * Dependencies : autonumeric.js@4.6.0
 * Released under the MIT License.
 */
function ANgetNumStr(pVal, pOpt, isRplace) {
	var x = document.createElement("input");
	    x.setAttribute("type", "hidden");
	
	var anElement  = new AutoNumeric(x, (isRplace?((""+pVal).replace(",",".")):pVal), pOpt );
	var lreturn = anElement.getFormatted();	
	var lclasses = $(x).attr("class");


	return {val:lreturn, class:lclasses};
}

function ANIGevents(itemId, opt, isRplace) {
    
	var ANelem;

	$("#"+itemId).focusin(function(hnd) {
		var lVal = $(this).val();
		apex.debug.message(5, "[Plug-in AN] focusin %s value :%s", itemId, lVal);
		if (lVal)
			ANelem = new AutoNumeric(this, (isRplace?((""+lVal).replace(",",".")):lVal) , opt );	
		else
			ANelem = new AutoNumeric(this, opt );	

		if (lVal == "" && ANelem.settings.styleRules) {
			if (ANelem.settings.styleRules.ranges) {
				Object.getOwnPropertyNames(ANelem.settings.styleRules.ranges).forEach(function(val, idx, array) {
					if (val == "class")
						$("#"+itemId).removeClass(ANelem.settings.styleRules.ranges[val]);
				  });
			}
			else {
				Object.getOwnPropertyNames(ANelem.settings.styleRules).forEach(function(val, idx, array) {
					$("#"+itemId).removeClass(ANelem.settings.styleRules[val]);
				});
			}
		}
		ANelem.reformat();		
	} );	 

	$("#"+itemId).focusout(function() {
		var result  = "";
		if (ANelem.get()!="") {
			result =(isRplace?((""+ ANelem.getNumber()).replace(".",",")): ANelem.getNumber()) ;
		}
		ANelem.remove();
		apex.debug.message(5, "[Plug-in AN] focusout %s value :%s", itemId, result);
		$(this).val(result);
	});
  
}

function ANIGsetAliment(itemId) {
	var $elm = $("div.ig-div-autonumeric:has(input[id^='"+itemId+"_']):first").parent();
	if ($elm.hasClass("u-tE")) {
		$("#"+itemId).css("text-align","right");
	}
	else if ($elm.hasClass("u-tC")) {
		$("#"+itemId).css("text-align","center");
	}
}

function ANIGinit(itemId, opt, isRplace) {
  apex.debug.message(4,"[Plug-in AN] ANIGinit(id:%s, replace_numbers:%s)", itemId,isRplace);
  var index = 0;
  const item$ = $('#'+itemId);
  const sr$ = item$.addClass('u-vh is-focusable')
	.parent();

  

  function render(value) {
	var showVal = ANgetNumStr(value, opt, isRplace);	
    const out = apex.util.htmlBuilder();
    out.markup('<div')
	  .attr('class', 'ig-div-autonumeric '+(showVal.class?"ig-autonumeric-custom "+showVal.class:""))
	  .attr('class', )
	  .markup('><input')
      .attr('type', 'hidden')
	  .attr('class', 'ig-auto-numeric')
      .attr('id', itemId+'_'+index+'_0')
	  .attr('name', itemId+'_'+index)
	  .attr('value', (isRplace?((""+value).replace(".",",")):value))
      .attr('tabindex', -1)
      .markup(' /><label')
	  .attr('for', itemId+'_'+index+'_0')
      .markup('>')
      .content(showVal.val)
      .markup('</label>')
	  .markup('</div>');

    index += 1;
	
    return out.toString();
  }

	$( document ).ready(function() {
		//add events focus in/out
		ANIGevents(itemId, opt, isRplace);
  
		//add aliment
		ANIGsetAliment(itemId);
   });
  
  apex.item.create(itemId, {
	setValue:function(pValue, pDisplayValue) {
	  item$.val(pValue);
	  //item$.closest('label').text(pDisplayValue);	  
	  apex.debug.message(5, "[Plug-in AN] apex item: %s set value : %s",itemId,pValue);
	},
	disable:function() {
	  item$.closest('.ig-div-autonumeric').removeClass('ig-div-autonumeric-enabled');
	  item$.closest('.ig-div-autonumeric').addClass('ig-div-autonumeric-disabled');
	  item$.attr('readonly','readonly');
	  item$.addClass('apex_disabled');
	},
    isDisabled: function() {
        return item$.closest('.ig-div-autonumeric').hasClass('ig-div-autonumeric-disabled');
    },	
    enable:function() {
		item$.closest('.ig-div-autonumeric').removeClass('ig-div-autonumeric-disabled');
		item$.closest('.ig-div-autonumeric').addClass('ig-div-autonumeric-enabled');
		//item$.parents(":eq(1)").removeClass("is-readonly").attr("tabindex", "");
		item$.removeAttr('readonly');
		item$.removeClass('apex_disabled');
    },
    displayValueFor:function(value) {
      return render(value);
	}
  });
  
}

function ANForminit(itemId, opt, isRplace) {

	apex.debug.message(4,"[Plug-in AN] ANForminit(id:%s, replace_numbers:%s)", itemId,isRplace);

	new AutoNumeric("#"+itemId, opt);
	
	apex.jQuery( apex.gPageContext$ ).on( "apexbeforepagesubmit", function() {
		
		if (AutoNumeric.isManagedByAutoNumeric("#"+itemId)) {
			var el = AutoNumeric.getAutoNumericElement("#"+itemId);
			if (el.get()!="") {
				 var result = el.getNumber()
				 el.remove();
				 var lVal = (isRplace?((""+result).replace(".",",")):result);
				 apex.debug.message(5,"[Plug-in AN] apexbeforepagesubmit id:%s, value:%s", itemId,lVal);
				 apex.item(itemId ).setValue(lVal);
			 }
		}
	} );
	

	$("#"+itemId).focusin(function(hnd) {
		$(this).parents(":eq(2)").addClass("is-active");
	} );	 

	$("#"+itemId).focusout(function() {
		$(this).parents(":eq(2)").removeClass("is-active");
	});	
}
//# sourceMappingURL=ANinit.js.map
