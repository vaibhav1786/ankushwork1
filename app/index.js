function buildQueryString() {
  let queryString = "(";

  document.getElementById("fromDateFFBR").value !== "" &&
  document.getElementById("toDateFFBR").value !== ""
    ? (queryString += `Registration_Date_of_FFBR >= "${
        document.getElementById("fromDateFFBR").value
      }" && Registration_Date_of_FFBR <= "${
        document.getElementById("toDateFFBR").value
      }" && `)
    : null;

  queryString += ")";

  return queryString;
}

async function generateComplaintList() {
  let ffbrStrartDate = document.getElementById("fromDateFFBR").value;
  let ffbrEndDate = document.getElementById("toDateFFBR").value;

  if (ffbrStrartDate === "" || ffbrEndDate === "") {
    alert("Please select mandatory FFBR date");
    return;
  }

  try {
    const queryString = buildQueryString();
    let modifiedQueryString = queryString.trim(); // Remove leading and trailing whitespaces
    modifiedQueryString = modifiedQueryString.slice(0, -5); // Remove the last '&&'
    modifiedQueryString += ")";
    console.log("criteria string", modifiedQueryString.trim());
    await ZOHO.CREATOR.init();
    configOfRegistered_FFBRs = {
      appName: "field-failure-feedback-report",
      reportName: "Registered_FFBRs",
      criteria: modifiedQueryString.trim(),
    };

    const AllResponse = await ZOHO.CREATOR.API.getAllRecords(
      configOfRegistered_FFBRs
    );

    console.log("Response aaja", AllResponse);

    const regFbbrID = [];
    const dataArr = [];
    const regFfbrData = AllResponse.data;
    console.log("regFfbrData", regFfbrData);
    regFfbrData.forEach((el) => {
      regFbbrID.push(el.ID);
    });

    // Define appendTableData function here
    function appendTableData(data) {
      const tableBody = document.getElementById("tableBody");
      tableBody.innerHTML = null;
      data.forEach((el, index) => {
        console.log("Inside Loop Single Data", el);
        const tr = document.createElement("tr");
        let srNo = document.createElement("td");
        srNo.textContent = index + 1;
        let ffbrExternalNo = document.createElement("td");
        ffbrExternalNo.textContent = el.FFBR_External_No || "";
        let ffbrInernalNo = document.createElement("td");
        ffbrInernalNo.textContent = el.FFBR_Internal_No || "";
        let ffbrLaunchingDate = document.createElement("td");
        ffbrLaunchingDate.textContent = el.FFBR_Launching_Date || "";
        let modifiedDate = document.createElement("td");
        modifiedDate.textContent = el.Modified_Date || "";
        let newModel = document.createElement("td");
        newModel.textContent = el.New_Model || "";
        let complaintType = document.createElement("td");
        complaintType.textContent = el.Complaint_Type || "";
        let isFailedPartSendToFactory = document.createElement("td");
        isFailedPartSendToFactory.textContent =
          el.Is_Failed_Part_Send_To_Factory || "";
        let division = document.createElement("td");
        division.textContent = el.Divisions.display_value || "";
        let preliminaryRootCauseAnalysis = document.createElement("td");
        preliminaryRootCauseAnalysis.textContent =
          el.Preliminary_Root_Cause_Analysis || "";
        let closureDate = document.createElement("td");
        closureDate.textContent = el.Closure_Date || "";
        let noOfDaysClosed = document.createElement("td");
        noOfDaysClosed.textContent = el.No_Of_Days_Closed || "";
        let statusDetails = document.createElement("td");
        statusDetails.textContent = el.Status_Details || "";
        let acknowledgementDate = document.createElement("td");
        acknowledgementDate.textContent = el.Acknowledgement_Date || "";
        let productGroup = document.createElement("td");
        productGroup.textContent = el.Product_Group.display_value || "";
        let productSegment = document.createElement("td");
        productSegment.textContent = el.Product_Segment.display_value || "";
        let model = document.createElement("td");
        model.textContent = el.Model_Number?.display_value || "";
        let productSrNo = document.createElement("td");
        productSrNo.textContent = el.Product_Sr_No?.display_value || "";
        let mfgDate = document.createElement("td");
        mfgDate.textContent = el.Mfg_Date || "";
        let deliveryDate = document.createElement("td");
        deliveryDate.textContent = el.Delivery_Date || "";
        let instDate = document.createElement("td");
        instDate.textContent = el.Inst_Date || "";
        let failureDate = document.createElement("td");
        failureDate.textContent = el.Failure_Date || "";
        let natureOfProblem = document.createElement("td");
        natureOfProblem.textContent = el.Nature_of_Problem.display_value || "";
        let quantityNo = document.createElement("td");
        quantityNo.textContent = el.Quantity_No || "";
        let failedCompSrNo = document.createElement("td");
        failedCompSrNo.textContent = el.FailedComp_Sr_No || "";
        let fieldVisitRequired = document.createElement("td");
        fieldVisitRequired.textContent = el.Field_Visit_Required || "";
        let obsvDealer = document.createElement("td");
        obsvDealer.textContent = el.Obsv_Dealer || "";
        let dealerName = document.createElement("td");
        dealerName.textContent = el.Dealer_Name || "";
        let sdeName = document.createElement("td");
        sdeName.textContent = el.SDE_Name || "";
        let customerName = document.createElement("td");
        customerName.textContent = el.Customer_Name || "";
        let location = document.createElement("td");
        location.textContent = el.Location || "";
        let address1 = document.createElement("td");
        address1.textContent = el.Address_1 || "";
        let emailId = document.createElement("td");
        emailId.textContent = el.emailId || "";
        let userName = document.createElement("td");
        userName.textContent = el.User_Name || "";
        let region = document.createElement("td");
        region.textContent = el.Region || "";
        let branch = document.createElement("td");
        branch.textContent = el.Branch || "";
        let department = document.createElement("td");
        department.textContent = el.Department || "";
        let ticketNo = document.createElement("td");
        ticketNo.textContent = el.Ticket_No || "";
        let obligation = document.createElement("td");
        obligation.textContent = el.Obligation || "";
        let productSubCategory = document.createElement("td");
        productSubCategory.textContent = el.Product_Sub_Category || "";
        let coilType = document.createElement("td");
        coilType.textContent = el.Coil_Type || "";
        let chassisType = document.createElement("td");
        chassisType.textContent = el.Chassis_Type || "";
        let manufactureAt = document.createElement("td");
        manufactureAt.textContent = el.Manufacture_at || "";
        let plant = document.createElement("td");
        plant.textContent = el.Plants.display_value || "";
        let submissionDate = document.createElement("td");
        submissionDate.textContent = el.Submission_Date || "";
        let ownerAssgDate = document.createElement("td");
        ownerAssgDate.textContent = el.Owner_Assg_Date || "";
        let containmentAction = document.createElement("td");
        containmentAction.textContent = el.Containment_Action || "";
        let containmentActionDate = document.createElement("td");
        containmentActionDate.textContent = el.Containment_Action_Date || "";
        let correctiveAction = document.createElement("td");
        correctiveAction.textContent = el.Corrective_Action || "";
        let correctiveAction2 = document.createElement("td");
        correctiveAction2.textContent = el.Corrective_Action_2 || "";
        tr.append(
          srNo,
          ffbrExternalNo,
          ffbrInernalNo,
          ffbrLaunchingDate,
          modifiedDate,
          newModel,
          complaintType,
          isFailedPartSendToFactory,
          preliminaryRootCauseAnalysis,
          closureDate,
          noOfDaysClosed,
          statusDetails,
          acknowledgementDate,
          productGroup,
          productSegment,
          model,
          productSrNo,
          mfgDate,
          deliveryDate,
          failureDate,
          natureOfProblem,
          quantityNo,
          failedCompSrNo,
          fieldVisitRequired,
          obsvDealer,
          dealerName,
          sdeName,
          customerName,
          location,
          address1,
          emailId,
          userName,
          region,
          branch,
          department,
          ticketNo,
          obligation,
          productSubCategory,
          coilType,
          chassisType,
          manufactureAt,
          plant,
          submissionDate,
          ownerAssgDate,
          containmentAction,
          containmentActionDate,
          correctiveAction,
          correctiveAction2
        );
        tableBody.append(tr);
        const table = document.getElementById("tableData");
        table.style.display = "block";
      });
      console.log("tableBody.innerHTML", tableBody.innerHTML);
    }

    for (let i = 0; i < regFbbrID.length; i++) {
      const regFbbrIDdata = {
        appName: "field-failure-feedback-report",
        reportName: "Registered_FFBRs",
        id: regFbbrID[i],
      };

      const singleUserData = await ZOHO.CREATOR.API.getRecordById(
        regFbbrIDdata
      );
      dataArr.push(singleUserData.data);
    }

    // Call appendTableData after the loop
    appendTableData(dataArr);
  } catch (error) {
    console.log("Error: ", JSON.stringify(error));
  }
}

window.onload = function () {
  const table = document.getElementById("tableData");
  table.style.display = "none";
};
