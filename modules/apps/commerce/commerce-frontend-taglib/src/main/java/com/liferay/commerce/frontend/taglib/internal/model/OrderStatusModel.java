package com.liferay.commerce.frontend.taglib.internal.model;

/**
 * @author Luca Pellizzon
 * @author Fabio Diego Mastrorilli
 */
public class OrderStatusModel {

	public OrderStatusModel(int code, String label, String label_i18n) {
		_code = code;
		_label = label;
		_label_i18n = label_i18n;
	}

	public int getCode() {
		return _code;
	}

	public String getLabel() {
		return _label;
	}

	public String getLabel_i18n() {
		return _label_i18n;
	}

	private final int _code;
	private final String _label;
	private final String _label_i18n;

}