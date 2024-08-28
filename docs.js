document.addEventListener('DOMContentLoaded', function () {
    for (let i = 1; i<4; i++){
        var collapse = document.getElementById(`collapse${i}`);
        if (collapse) {
            collapse.addEventListener('hidden.bs.collapse', function () {
                
                var childAccordions = document.querySelectorAll(`.accordion-collapse .show`);
                childAccordions.forEach(function (accordion) {
                    var collapseInstance = bootstrap.Collapse.getInstance(accordion);
                    if (collapseInstance) {
                        collapseInstance.hide();
                    }
                });
            });
        }
    }
    $(function(){
        $("#lossesAccordion").load("lossesAccordion.html");
      });
});