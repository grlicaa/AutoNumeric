/**
 * ANinit.js v1.0.0 | THE RIGHT THING SOLUTIONS d.o.o. | Andrej Grlica | andrej.grlica@right-thing.solutions.si 
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
		lVal = $(this).val();
		ANelem = new AutoNumeric(this, (isRplace?((""+lVal).replace(",",".")):lVal) , opt );	
		//ANelem.set(lVal);
		if (lVal == "" && ANelem.settings.styleRules.ranges) {
			Object.getOwnPropertyNames(ANelem.settings.styleRules.ranges).forEach(function(val, idx, array) {
				if (val = "class")
					$("#"+itemId).removeClass(ANelem.settings.styleRules.ranges[val]);
			  });
		}
		else if (lVal == "" && ANelem.settings.styleRules && !ANelem.settings.styleRules.ranges) {
			Object.getOwnPropertyNames(ANelem.settings.styleRules).forEach(function(val, idx, array) {
				$("#"+itemId).removeClass(ANelem.settings.styleRules[val]);
			  });
		}
		ANelem.reformat();		
	} );	 

	$("#"+itemId).focusout(function() {
		var result  = "";
		if (ANelem.get()!="") {
			result =(isRplace?((""+ ANelem.getNumber()).replace(".",",")): ANelem.getNumber()) ;
		}
		ANelem.remove();
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
  var index = 0;
  const item$ = $('#'+itemId);
  const sr$ = item$.addClass('u-vh is-focusable')
	.parent();

  

  function render(full, value) {
	var p_val = value||"fa-navicon";
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
	  .attr('data-class', (showVal.class?showVal.class:""))
      .attr('value', (isRplace?((""+value).replace(",",".")):value))
      .attr('tabindex', -1)
      .optionalAttr('disabled', false)
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
	  item$.closest('label').text(pDisplayValue);	  
    },
	
    disable:function() {
      item$.closest('.ig-div-autonumeric').removeClass('ig-div-autonumeric-enabled');
	  item$.closest('.ig-div-autonumeric').addClass('ig-div-autonumeric-disabled');
	  item$.closest('.ig-div-autonumeric').prop('disabled', true);
      item$.prop('disabled', true);
    },
    enable:function() {
		item$.closest('.ig-div-autonumeric').removeClass('ig-div-autonumeric-disabled');
		item$.closest('.ig-div-autonumeric').addClass('ig-div-autonumeric-enabled');
		item$.closest('.ig-div-autonumeric').prop('disabled', false);
        item$.prop('disabled', false);
    },
    displayValueFor:function(value) {
      return render(true, value);
    }		
  });
  
}

function ANForminit(itemId, opt, isRplace) {

	new AutoNumeric("#"+itemId, opt);
	
	apex.jQuery( apex.gPageContext$ ).on( "apexbeforepagesubmit", function() {
		if (AutoNumeric.isManagedByAutoNumeric("#"+itemId)) {
			var el = AutoNumeric.getAutoNumericElement("#"+itemId);
			if (el.get()!="") {
				 var result = el.getNumber()
				 el.remove();
				 apex.item(itemId ).setValue((isRplace?((""+result).replace(".",",")):result));
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
