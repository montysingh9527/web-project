import MyTable from "./MyTable/MyTable.vue";

const components = {
    "MyTable": MyTable
}

export default {
    install(app) {
        for(let name in components){
            app.component(name, components[name]);
        }
    }
}


