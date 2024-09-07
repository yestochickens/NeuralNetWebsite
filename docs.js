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
        $("#lossesAccordion").load("Accordions/Losses/lossesAccordion.html");
        $("#activatorsAccordion").load("Accordions/Activators/activatorsAccordion.html");
        $("#intializersAccordion").load("Accordions/Initializers/intializersAccordion.html");
        $("#optimizersAccordion").load("Accordions/Optimizers/optimizersAccordion.html");
        $("#navbar").load("nav/navbar.html");
      });
});



