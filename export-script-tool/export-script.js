(function () {
  function isVisible(el) {
    if (!el) return false;
    const s = window.getComputedStyle(el);
    return s.display !== "none" && s.visibility !== "hidden" && el.offsetParent !== null;
  }

  function cellValue(td) {
    if (!td) return "";
    const input = td.querySelector("input");
    if (input) return input.value ?? input.getAttribute("value") ?? "";
    const select = td.querySelector("select");
    if (select) return select.options[select.selectedIndex]?.text || select.value || "";
    return td.innerText.trim();
  }

  const tables = [...document.querySelectorAll("table")].filter(isVisible);
  if (!tables.length) {
    alert("没找到当前可见的表格");
    return;
  }

  const table = tables.sort((a, b) => b.querySelectorAll("tr").length - a.querySelectorAll("tr").length)[0];
  const rows = [];
  const trs = table.querySelectorAll("tr");

  trs.forEach(tr => {
    const tds = tr.querySelectorAll("td");
    if (tds.length < 5) return;

    const row = [...tds].map(cellValue).filter(v => v !== "");
    if (row.length) rows.push(row);
  });

  const csv = rows
    .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);

  const activeTab =
    [...document.querySelectorAll("li,button,a,span,div")]
      .find(el => isVisible(el) && /Run-param|Pro-param|Sys-param/i.test(el.innerText) && /active|curr|selected|on/i.test(el.className))
      ?.innerText.trim() || "params";

  a.download = activeTab.replace(/\s+/g, "_") + ".csv";
  a.click();

  console.log("当前导出:", activeTab, "行数:", rows.length);
})();
