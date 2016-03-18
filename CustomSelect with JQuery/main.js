$(document).ready(function() {

	function customSelect($nativeSelect) {
		$nativeSelect.hide();

		var wrap = $('<div/>', {
			class: 'select-wrap'
		});

		var btn = $('<div/>', {
			class: 'button'
		}).appendTo(wrap);

		var ul = $('<ul/>').appendTo(wrap);

		var nativeOptions = $nativeSelect.find('option');

		nativeOptions.each(function(ind, option) {
			$('<li/>', {
				text: $(option).text()
			}).appendTo(ul);

			if ( $(option).val() == $nativeSelect.val() ) {
				btn.text( $(option).text());
			}
		});

		/* вставляем wrap перед нативным селектом*/
		$nativeSelect.parent().append(wrap);


		/* клик по кнопке открывает или закрывает меню */
		btn.on('click', function() {
			if ( ul.css('display') !== 'none' ) {
				ul.slideUp();
			}
			else {
				ul.slideDown();
			}
		});
		/* клик по полю закрывает меню*/
		$(document).on('click', function(e) {
			var $target = $(e.target);
			if (!$target.closest('.select-wrap').length) {
				ul.slideUp();
			}
			else {
				btn.text($target.text());
			}
		});
	}
	customSelect( $('#sel') );
});