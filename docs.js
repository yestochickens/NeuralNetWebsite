document.addEventListener('DOMContentLoaded', function () {
    var collapseOne = document.getElementById('collapseOne');
    if (collapseOne) {
        collapseOne.addEventListener('hidden.bs.collapse', function () {
            var childAccordions = document.querySelectorAll('#collapseOne .accordion-collapse');
            childAccordions.forEach(function (accordion) {
                if (accordion.classList.contains('show')) {
                    var collapseInstance = bootstrap.Collapse.getInstance(accordion);
                    if (collapseInstance) {
                        collapseInstance.hide();
                    }
                }
            });
        });
    }
});