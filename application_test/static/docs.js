document.addEventListener('DOMContentLoaded', function () {
    const parentAccordion = document.getElementById('parentAccordion');
    parentAccordion.addEventListener('hide.bs.collapse', function (e) {
        const childAccordions = e.target.querySelectorAll('.accordion-collapse');
        childAccordions.forEach((childAccordion) => {
            const bsCollapse = bootstrap.Collapse.getInstance(childAccordion);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        });
    });
});



