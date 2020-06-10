function createPopup(text, title) {
	var popup = document.createElement("div")
	popup.classList.add("popupContainer")

	var popupContents = document.createElement("div")
	popupContents.classList.add("popupContent")

	var popupTitle = document.createElement("div")
	popupTitle.classList.add("popupTitle")
	popupTitle.textContent = title

	var paragraphText = document.createElement("p")
	paragraphText.textContent = text

	var popupText = document.createElement("div")
	popupText.classList.add("popupText")
	popupText.appendChild(paragraphText)

	var popupDismiss = document.createElement("button")
	popupDismiss.classList.add("popupDismiss");
	popupDismiss.textContent = "Dismiss"
	popupDismiss.onclick = () => {
		popup.remove();
	}
	popupText.appendChild(popupDismiss);

	popup.showPopup = () => {
		popup.style.display = "block";
	}

	popup.setPopupText = (newText) => {
		paragraphText.textContent = newText
	}

	popup.setPopupTitle = (newTitle) => {
		popupTitle.textContent = newTitle
	}

	popupContents.appendChild(popupTitle)
	popupContents.appendChild(popupText)
	popup.appendChild(popupContents)

	var bodyTag = document.getElementsByTagName("body")[0]
	bodyTag.appendChild(popup)

	return popup
}