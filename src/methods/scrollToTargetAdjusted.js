export default function scrollToTargetAdjusted(elementId, offset) {
  var element = document.getElementById(elementId);
  var elementPosition = element.getBoundingClientRect().top;
  var offsetPosition = elementPosition + window.scrollY - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
