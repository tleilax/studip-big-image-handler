<?php
/**
 * BigImageHandlerPlugin.class.php
 *
 * Ermöglicht es, übergroße Bilder, die skaliert eingebunden wurden, per Klick in einem neuen Fenster zu öffnen.
 *
 * @author  Jan-Hendrik Willms <tleilax+studip@gmail.com>
 * @version 1.0
 **/
class BigImageHandlerPlugin extends StudIPPlugin implements SystemPlugin
{
    public function __construct()
    {
        parent::__construct();

        if (method_exists($this, 'addStylesheet')) {
            $this->addStylesheet('big-image-handler.less');
        } else {
            PageLayout::addStylesheet($this->getPluginURL() . '/big-image-handler.css');
        }
        PageLayout::addScript($this->getPluginURL() . '/big-image-handler.js');
    }
}
