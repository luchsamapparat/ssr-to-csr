// @ts-check

/**
 * @param {string} id 
 * @returns {DocumentFragment}
 */
export function getTemplate(id) {
    /** @type HTMLTemplateElement */
    const template = document.querySelector(`template#${id}-template`);
    // @ts-ignore
    return template.content.cloneNode(true);
}