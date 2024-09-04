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
    $(function(){
        $("#lossesAccordion").load("Accordions/lossesAccordion.html");
        $("#activatorsAccordion").load("Accordions/activatorsAccordion.html");
        $("#intializersAccordion").load("Accordions/intializersAccordion.html");
        $("#optimizersAccordion").load("Accordions/optimizersAccordion.html");
      });
});

