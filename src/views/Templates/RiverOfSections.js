import React, {useState} from "react";
import { Container } from "reactstrap";
import { RIVER_OF_SECTIONS } from "./constants.templates"
import { ExpandableSubsection } from "./ExpandableSubsection";
import { Crumbs } from "./BreadCrumbs"
/**
 * Layout for river of sections style of layout (e.g. manage page)
 */
export const RiverOfSections = ({active, label, sections, children}) => {
    const [activeSection, setActiveSection] = useState(active)
    let contents = []
    const elements = React.Children.toArray(children) 

    function openSection(i){
        setActiveSection(i) 
    }

    function closeSection(){
        setActiveSection() 
    }


    for(var i = 0 ; i<sections.length; i++){
        contents.push(
            <ExpandableSubsection 
                active={activeSection} 
                index={i} 
                section={sections[i]}
                onOpen={openSection}
                onClose={closeSection}
            >
                {elements[i]}
            </ExpandableSubsection>
        )
    }
    //any extra children add as non-expandable elements
    for(var j = i; j<elements.length; j++){
        contents.push(elements[j])
    }


    let ros = (
        <Container className={RIVER_OF_SECTIONS.pageCSS}>
            {(typeof activeSection != "undefined") && 
                <Container className={RIVER_OF_SECTIONS.crumbsCSS}>
                    <Crumbs 
                        buttons={[{text: label}, {text: sections[activeSection].title}]} 
                        setPage = {closeSection}
                    />
                </Container>
            }
            {contents}
        </Container>
    )
    return ros
}


