const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class PerformanceMonitor {
  constructor() {
    this.buildDir = path.join(process.cwd(), '.next');
    this.reportPath = path.join(process.cwd(), 'performance-report.json');
  }

  // Get bundle sizes from .next build output
  getBundleSizes() {
    const staticDir = path.join(this.buildDir, 'static');
    const bundleSizes = {};

    if (!fs.existsSync(staticDir)) {
      console.log('Build directory not found. Please run "pnpm build" first.');
      return bundleSizes;
    }

    const walkDir = (dir, basePath = '') => {
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const relativePath = path.join(basePath, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) {
          walkDir(filePath, relativePath);
        } else if (file.endsWith('.js') || file.endsWith('.css')) {
          bundleSizes[relativePath] = {
            size: stats.size,
            sizeKB: Math.round(stats.size / 1024 * 100) / 100
          };
        }
      });
    };

    walkDir(staticDir);
    return bundleSizes;
  }

  // Calculate total bundle size
  getTotalBundleSize(bundleSizes) {
    return Object.values(bundleSizes).reduce((total, { size }) => total + size, 0);
  }

  // Get performance metrics from build output
  getPerformanceMetrics() {
    const buildLogPath = path.join(this.buildDir, 'build-manifest.json');
    const metrics = {
      timestamp: new Date().toISOString(),
      bundleSizes: this.getBundleSizes(),
      totalSizeKB: 0,
      largestChunks: []
    };

    metrics.totalSizeKB = Math.round(this.getTotalBundleSize(metrics.bundleSizes) / 1024 * 100) / 100;
    
    // Get largest chunks
    metrics.largestChunks = Object.entries(metrics.bundleSizes)
      .sort((a, b) => b[1].size - a[1].size)
      .slice(0, 10)
      .map(([file, { sizeKB }]) => ({ file, sizeKB }));

    return metrics;
  }

  // Generate performance report
  generateReport() {
    const metrics = this.getPerformanceMetrics();
    
    console.log('\n🚀 Performance Report');
    console.log('========================');
    console.log(`📊 Total Bundle Size: ${metrics.totalSizeKB} KB`);
    console.log(`📦 Number of Chunks: ${Object.keys(metrics.bundleSizes).length}`);
    console.log('\n📈 Largest Chunks:');
    
    metrics.largestChunks.forEach(({ file, sizeKB }, index) => {
      const status = sizeKB > 100 ? '🔴' : sizeKB > 50 ? '🟡' : '🟢';
      console.log(`${index + 1}. ${status} ${file}: ${sizeKB} KB`);
    });

    // Performance recommendations
    console.log('\n💡 Performance Recommendations:');
    
    if (metrics.totalSizeKB > 1000) {
      console.log('🔴 Total bundle size is very large (>1MB). Consider code splitting.');
    } else if (metrics.totalSizeKB > 500) {
      console.log('🟡 Total bundle size is moderate (>500KB). Room for improvement.');
    } else {
      console.log('🟢 Total bundle size is good (<500KB).');
    }

    // Check for large individual chunks
    const largeChunks = metrics.largestChunks.filter(chunk => chunk.sizeKB > 100);
    if (largeChunks.length > 0) {
      console.log(`🔴 Found ${largeChunks.length} large chunks (>100KB). Consider splitting these.`);
    }

    // Save report
    fs.writeFileSync(this.reportPath, JSON.stringify(metrics, null, 2));
    console.log(`\n📄 Report saved to: ${this.reportPath}`);

    return metrics;
  }

  // Compare with previous report
  compareWithPrevious() {
    if (!fs.existsSync(this.reportPath)) {
      console.log('No previous report found. Run the monitor first.');
      return;
    }

    const previousReport = JSON.parse(fs.readFileSync(this.reportPath, 'utf8'));
    const currentMetrics = this.getPerformanceMetrics();

    console.log('\n📊 Performance Comparison');
    console.log('============================');
    
    const sizeDiff = currentMetrics.totalSizeKB - previousReport.totalSizeKB;
    const chunkDiff = Object.keys(currentMetrics.bundleSizes).length - Object.keys(previousReport.bundleSizes).length;
    
    console.log(`Bundle Size: ${currentMetrics.totalSizeKB} KB (${sizeDiff > 0 ? '+' : ''}${sizeDiff} KB)`);
    console.log(`Chunk Count: ${Object.keys(currentMetrics.bundleSizes).length} (${chunkDiff > 0 ? '+' : ''}${chunkDiff})`);
    
    if (sizeDiff > 0) {
      console.log('🔴 Bundle size increased!');
    } else if (sizeDiff < 0) {
      console.log('🟢 Bundle size decreased!');
    } else {
      console.log('🟡 Bundle size unchanged.');
    }
  }

  // Set performance budgets
  checkBudgets() {
    const budgets = {
      totalSizeKB: 500,
      maxChunkSizeKB: 100,
      maxChunkCount: 50
    };

    const metrics = this.getPerformanceMetrics();
    const violations = [];

    if (metrics.totalSizeKB > budgets.totalSizeKB) {
      violations.push(`Total bundle size (${metrics.totalSizeKB} KB) exceeds budget (${budgets.totalSizeKB} KB)`);
    }

    const largeChunks = metrics.largestChunks.filter(chunk => chunk.sizeKB > budgets.maxChunkSizeKB);
    if (largeChunks.length > 0) {
      violations.push(`${largeChunks.length} chunks exceed size budget (${budgets.maxChunkSizeKB} KB)`);
    }

    if (Object.keys(metrics.bundleSizes).length > budgets.maxChunkCount) {
      violations.push(`Chunk count (${Object.keys(metrics.bundleSizes).length}) exceeds budget (${budgets.maxChunkCount})`);
    }

    if (violations.length > 0) {
      console.log('\n⚠️  Performance Budget Violations:');
      violations.forEach(violation => console.log(`🔴 ${violation}`));
      process.exit(1);
    } else {
      console.log('\n✅ All performance budgets met!');
    }
  }
}

// CLI interface
const command = process.argv[2];
const monitor = new PerformanceMonitor();

switch (command) {
  case 'report':
    monitor.generateReport();
    break;
  case 'compare':
    monitor.compareWithPrevious();
    break;
  case 'budget':
    monitor.checkBudgets();
    break;
  default:
    console.log('Usage: node scripts/performance-monitor.js [report|compare|budget]');
    break;
}