<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="functions" uri="http://www.jahia.org/tags/functions" %>
<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="uiComponents" uri="http://www.jahia.org/tags/uiComponentsLib" %>
<%@ taglib prefix="utility" uri="http://www.jahia.org/tags/utilityLib" %>
<%--@elvariable id="currentNode" type="org.jahia.services.content.JCRNodeWrapper"--%>
<%--@elvariable id="currentResource" type="org.jahia.services.render.Resource"--%>
<%--@elvariable id="out" type="java.io.PrintWriter"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>
<%--@elvariable id="script" type="org.jahia.services.render.scripting.Script"--%>
<%--@elvariable id="scriptInfo" type="java.lang.String"--%>
<%--@elvariable id="url" type="org.jahia.services.render.URLGenerator"--%>
<%--@elvariable id="workspace" type="java.lang.String"--%>
<jcr:node var="historicalChartSettings" path="${renderContext.site.path}/historicalChartSettings"/>
<c:set var="apiUrl" value="${historicalChartSettings.properties['apiUrl'].string}"/>
<c:set var="apiKey" value="${historicalChartSettings.properties['apiKey'].string}"/>



<template:addResources type="javascript" resources="jquery.min.js"/>
<template:addResources type="javascript" resources="admin-bootstrap.js"/>
<template:addResources type="javascript" resources="jquery-ui.min.js,jquery.blockUI.js,workInProgress.js"/>
<template:addResources type="javascript" resources="historicalChartConnectorUtils.js"/>

<template:addResources>
    <script type="text/javascript">
        var intervalValue;

        var API_URL = '${url.context}/modules/api/jcr/v1';
        var jcrApiUrl = '${functions:escapeJavaScript(apiUrl)}';
        var jcrApiKey = '${functions:escapeJavaScript(apiKey)}';

        var readUrl = API_URL + "/live/${renderContext.UILocale}/paths${renderContext.site.path}/historicalChartSettings";

        <c:choose>
            <c:when test="${empty historicalChartSettings}">
                var mode = 'create';
                var writeUrl = API_URL + "/default/${renderContext.UILocale}/nodes/${renderContext.site.identifier}";
            </c:when>
            <c:otherwise>
                var mode = 'update';
                var writeUrl = API_URL + "/default/${renderContext.UILocale}/nodes/${historicalChartSettings.identifier}";
            </c:otherwise>
        </c:choose>

    </script>
</template:addResources>

<div class="clearfix">
    <h1 class="pull-left"><fmt:message key="jnt_historicalChartConnector"/></h1>
    <div class="pull-right">
        <img alt="" src="<c:url value="${url.currentModule}/img/pie-chart-icon-72.png"/>"
             width="80" height="80">
    </div>
</div>

<div class="container">
    <div class="box-1">
        <div class="row-fluid">
            <div class="span6">
                <form class="form-horizontal" name="twitterParameters">
                    <fieldset>
                        <legend>
                        </legend>
                        <div class="control-group">
                            <label class="control-label">
                                <fmt:message key="jnt_historicalChartConnector.apiUrl"/>
                            </label>
                            <div class="controls">
                                <input id="historicalChartApiUrl" name="apiUrl" type="text"
                                       value="${apiUrl}"/>
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label">
                                <fmt:message key="jnt_historicalChartConnector.apiKey"/>
                            </label>
                            <div class="controls">
                                <input id="historicalChartApiKey" name="apiKey" type="text"
                                       value="${apiKey}"/>
                            </div>
                        </div>




                        <div class="control-group">
                            <div class="controls">
                                <button id="saveHistoricalChartSettings" type="button" class="btn btn-primary"
                                        onclick="createUpdateHistoricalChartParameters(intervalValue)" disabled>
                                    <fmt:message key="label.save"/>
                                </button>
                                <c:if test="${not empty apiUrl and not empty apiKey}">
                                    <button id="cancelChangeHistoricalChartSettings" type="button" class="btn btn-danger"
                                            onclick="resetHistoricalChartSettings()" disabled>
                                        <fmt:message key="label.cancel"/>
                                    </button>
                                </c:if>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div class="span6" style="text-align:justify">
                    <div class="alert alert-info">
                        <h4><fmt:message key="jnt_historicalChartConnector.alertTitle"/></h4>
                        <p>
                            <fmt:message key="jnt_historicalChartConnector.description"/><br/>
                            <fmt:message key="jnt_historicalChartConnector.version"/><br/>
                        </p>
                    </div>
            </div>
        </div>
    </div>
</div>