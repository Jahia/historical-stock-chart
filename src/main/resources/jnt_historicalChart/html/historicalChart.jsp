<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="ui" uri="http://www.jahia.org/tags/uiComponentsLib" %>
<%@ taglib prefix="functions" uri="http://www.jahia.org/tags/functions" %>
<%@ taglib prefix="query" uri="http://www.jahia.org/tags/queryLib" %>
<%@ taglib prefix="utility" uri="http://www.jahia.org/tags/utilityLib" %>
<%@ taglib prefix="s" uri="http://www.jahia.org/tags/search" %>
<%--@elvariable id="currentNode" type="org.jahia.services.content.JCRNodeWrapper"--%>
<%--@elvariable id="out" type="java.io.PrintWriter"--%>
<%--@elvariable id="script" type="org.jahia.services.render.scripting.Script"--%>
<%--@elvariable id="scriptInfo" type="java.lang.String"--%>
<%--@elvariable id="workspace" type="java.lang.String"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>
<%--@elvariable id="currentResource" type="org.jahia.services.render.Resource"--%>
<%--@elvariable id="url" type="org.jahia.services.render.URLGenerator"--%>
<template:addResources type="css" resources="historic-stock-chart.css" />
<jcr:node var="configNode" path="${renderContext.site.path}/historicalChartSettings" />
<c:set var="apiUrl" value="${configNode.propertiesAsString['apiUrl']}"/>
<c:set var="apiKey" value="${configNode.propertiesAsString['apiKey']}"/>
<c:set var="chartTitle" value="${currentNode.propertiesAsString['chartTitle']}"/>
<c:set var="stockSymbol" value="${currentNode.propertiesAsString['stockSymbol']}"/>
<c:set var="dateTime" value="${currentNode.propertiesAsString['dateTime']}"/>
<c:set var="dateInterval" value="${currentNode.propertiesAsString['dateInterval']}"/>
<c:set var="uuid" value="${currentNode.identifier}"/>
<c:set var="moduleUrl" value="${url.currentModule}"/>
<c:set var="requestedDataUrl" value=""/>
<c:set var="dateParameters" value=""/>

<c:if test="${not renderContext.editMode}">
    <template:addResources type="css" resources="flotr.css" />
    <template:addResources type="css" resources="templates/finance.css"  />
    <template:addResources type="javascript" resources="envision/custom/yepnope.js"/>
    <template:addResources type="javascript" resources="envision/custom/finance.js"/>
    <template:addResources type="javascript" resources="envision/custom/includes.js"/>
    <template:addResources type="javascript" resources="date.js"/>

    <c:choose>
        <c:when test="${empty apiKey}">
            <c:set var="requestedDataUrl" value="${apiUrl}/${stockSymbol}.json"/>
        </c:when>
        <c:otherwise>
            <c:set var="requestedDataUrl" value="${apiUrl}/${stockSymbol}.json?api_key=${apiKey}"/>
        </c:otherwise>
    </c:choose>


    <template:addResources >
        <script type="text/javascript">
            //start the chart
            callIncludes('${moduleUrl}',
                         'stock-chart-${uuid}',
                         'title-finance-${uuid}',
                         '${requestedDataUrl}',
                         '${dateInterval}'[0],
                         '${dateTime}',
                         'finance');
        </script>
    </template:addResources>



    <div><h4>${chartTitle}</h4></div>
    <div id="stock-chart-content">
        <h4 id="title-finance-${uuid}">Finance</h4>
        <div id="stock-chart-${uuid}" class="stock-chart"></div>
    </div>
</c:if>

<%-- will show only for edit mode --%>
<c:if test="${renderContext.editMode}">
    <div><h4>${chartTitle}</h4></div>
    <div class="stock-chart-content-edit">
        <img src="${url.currentModule}/img/finance-preview.png">
    </div>
</c:if>