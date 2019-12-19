import description_list_list from './import/description.js'
import heading_list from './import/heading.js'
import id_list_list from './import/id.js'
import tabname_list from "./import/tabclass.js";

for(var i = 0; i < id_list_list.length; i++) {
    var id_list = id_list_list[i];
    var description_list = description_list_list[i];
    var options_str = "";

    for(var j = 0; j < id_list.length; j++) {
        var option_str;
        var need_input = !(id_list[j].includes("-cb"));

        if(need_input) {
            option_str = `
            <div class="option">
                <span class="arrow">>></span>

                <input class="checkbox show-input" type="checkbox" onclick="showInput(this);generateCmd();" id="${id_list[j]}-cb" />

                <label class="option-text" for="${id_list[j]}-cb">
                    ${description_list[j]}
                </label>

                <div class="input-text" style="display:none">
                    <input type="text" id="${id_list[j]}" onblur="checkRequired(this);generateCmd();" />
                    <div class="warning">This is required.</div>
                </div>
            </div>
            `;
        }

        else {
            option_str = `
            <div class="option">
                <span class="arrow">>></span>

                <input class="checkbox" type="checkbox" onclick="generateCmd()" id="${id_list[j]}" />

                <label class="option-text" for="${id_list[j]}">
                    ${description_list[j]}
                </label>
            </div>
            `;
        }
        options_str += option_str;
    }

    var section = `
    <section class="tabcontent ${tabname_list[i]}">
        <h2>${heading_list[i]}</h2>
        ${options_str}
    </section>`;

    var target_out = document.getElementsByClassName("main-content")[0];
    var target_in = target_out.getElementsByClassName("target-in")[0];
    target_out.insertBefore(createNode(section), target_in);

}

document.getElementById("u-cb").setAttribute("onclick", "showInput(this);checkTab();generateCmd();");
document.getElementsByClassName("tablinks")[2].disabled = true;

function createNode(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}